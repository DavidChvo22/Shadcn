'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { BadgeCheck } from 'lucide-react'
import type { ConfiguratorBlock as ConfiguratorBlockType } from '@/payload-types'
import { useTranslations, useLocale } from 'next-intl'

type ConfiguratorBlockProps = ConfiguratorBlockType

const includedKeys = ['sections', 'responsive', 'seo', 'support'] as const

const ConfiguratorBlock: React.FC<ConfiguratorBlockProps> = (props) => {
  const t = useTranslations('ConfiguratorBlock')
  const locale = useLocale()
  const { categories, currency: currencyFromProps, priceScale: priceScaleFromProps } = props
  const currency = currencyFromProps || 'EUR'
  const priceScale =
    typeof priceScaleFromProps === 'number' && priceScaleFromProps >= 0 ? priceScaleFromProps : 0
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('')
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState<string>('')
  const [openPages, setOpenPages] = useState<string[]>([])
  const [selectedBlocks, setSelectedBlocks] = useState<Set<string>>(new Set())

  const selectedCategory = categories?.find((cat) => cat?.name === selectedCategoryName)
  const selectedSubcategory = selectedCategory?.subcategories?.find(
    (sub) => sub?.name === selectedSubcategoryName,
  )

  // Initialize selected blocks with default values when subcategory changes
  useEffect(() => {
    if (!selectedSubcategory?.pages) {
      setSelectedBlocks(new Set())
      return
    }

    const defaultBlocks = new Set<string>()
    selectedSubcategory.pages.forEach((page) => {
      if (page?.blocks && page?.name) {
        page.blocks.forEach((block, blockIndex) => {
          if (block?.default) {
            const blockKey = `${page.name}-${blockIndex}`
            defaultBlocks.add(blockKey)
          }
        })
      }
    })
    setSelectedBlocks(defaultBlocks)
  }, [selectedSubcategory])

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryName(value)
    setSelectedSubcategoryName('') // Reset subcategory when category changes
    setOpenPages([]) // Reset open pages
    setSelectedBlocks(new Set()) // Reset selected blocks
  }

  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategoryName(value)
    setOpenPages([]) // Reset open pages when subcategory changes
    setSelectedBlocks(new Set()) // Reset selected blocks, useEffect will initialize defaults
  }

  const formatPrice = useCallback(
    (value: number) => {
      const resolvedLocale = locale || 'sk-SK'
      let resolvedCurrency = currency || 'EUR'
      let formatter: Intl.NumberFormat
      try {
        formatter = new Intl.NumberFormat(resolvedLocale, {
          style: 'currency',
          currency: resolvedCurrency,
        })
      } catch {
        resolvedCurrency = 'EUR'
        formatter = new Intl.NumberFormat(resolvedLocale, {
          style: 'currency',
          currency: resolvedCurrency,
        })
      }
      const divisor = Math.pow(10, priceScale)
      return formatter.format((value || 0) / (divisor || 1))
    },
    [locale, currency, priceScale],
  )

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="container px-16 py-8">
        <p className="text-muted-foreground">{t('errors.noCategories')}</p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-4 text-xs">{JSON.stringify(props, null, 2)}</pre>
        )}
      </div>
    )
  }

  const toggleBlock = (pageName: string, blockIndex: number) => {
    const blockKey = `${pageName}-${blockIndex}`
    setSelectedBlocks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(blockKey)) {
        newSet.delete(blockKey)
      } else {
        newSet.add(blockKey)
      }
      return newSet
    })
  }

  // Calculate total price from selected blocks only
  const calculateTotalPrice = () => {
    if (!selectedSubcategory?.pages) return 0
    let total = 0
    selectedSubcategory.pages.forEach((page) => {
      if (page.blocks) {
        page.blocks.forEach((block, blockIndex) => {
          const blockKey = `${page.name}-${blockIndex}`
          if (selectedBlocks.has(blockKey) && block.price) {
            total += block.price
          }
        })
      }
    })
    return total
  }

  const totalPrice = calculateTotalPrice()

  // Calculate prices by group
  const calculateGroupPrices = () => {
    if (!selectedSubcategory?.pages) return {}
    const groupPrices: Record<string, number> = {}

    selectedSubcategory.pages.forEach((page) => {
      const group = page?.group || 'stranky'
      if (!groupPrices[group]) {
        groupPrices[group] = 0
      }

      if (page.blocks) {
        page.blocks.forEach((block, blockIndex) => {
          const blockKey = `${page.name}-${blockIndex}`
          if (selectedBlocks.has(blockKey) && block?.price) {
            groupPrices[group] += block.price
          }
        })
      }
    })

    return groupPrices
  }

  const groupPrices = calculateGroupPrices()
  const groupLabels: Record<string, string> = {
    stranky: t('groups.stranky'),
    layout: t('groups.layout'),
    extra: t('groups.extra'),
  }

  return (
    <div className="container px-16 py-32">
      <h1 className="mb-8 text-4xl font-semibold">{t('heading')}</h1>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Ľavá časť - Selectory a Pages/Bloky */}
        <div className="flex-1 space-y-6">
          {/* Selectory vedľa seba */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium">{t('selectTypeLabel')}</label>
              <Select value={selectedCategoryName} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full rounded-3xl border-2 border-border">
                  <SelectValue placeholder={t('selectTypePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((cat) => cat?.name)
                    .map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCategory && selectedCategory.subcategories ? (
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium">{t('selectCategoryLabel')}</label>
                <Select value={selectedSubcategoryName} onValueChange={handleSubcategoryChange}>
                  <SelectTrigger className="w-full rounded-3xl border-2 border-border">
                    <SelectValue placeholder={t('selectCategoryPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory.subcategories
                      .filter((sub) => sub?.name)
                      .map((subcategory) => (
                        <SelectItem key={subcategory.name} value={subcategory.name}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="flex-1 hidden md:block" />
            )}
          </div>

          {/* Pages a bloky v samostatnom okne */}
          {selectedSubcategory &&
            selectedSubcategory.pages &&
            (() => {
              // Group pages by their group property
              const groupedPages = selectedSubcategory.pages
                .filter((page) => page?.name)
                .reduce(
                  (acc, page) => {
                    const group = page?.group || 'stranky'
                    if (!acc[group]) {
                      acc[group] = []
                    }
                    acc[group].push(page)
                    return acc
                  },
                  {} as Record<string, typeof selectedSubcategory.pages>,
                )

              const groupLabels: Record<string, string> = {
                stranky: t('groups.stranky'),
                layout: t('groups.layout'),
                extra: t('groups.extra'),
              }

              return (
                <Card className="rounded-3xl border-2 border-border bg-background shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">{t('pagesAndBlocks')}</CardTitle>
                    {selectedSubcategory.description && (
                      <p className="text-muted-foreground text-sm mt-2">
                        {selectedSubcategory.description}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(groupedPages).map(([groupKey, pagesInGroup]) => {
                      const groupTotal = pagesInGroup.reduce((sum, page) => {
                        const pageName = page?.name as string
                        return (
                          sum +
                          (page?.blocks?.reduce((blockSum, block, blockIndex) => {
                            const blockKey = `${pageName}-${blockIndex}`
                            if (selectedBlocks.has(blockKey) && block?.price) {
                              return blockSum + Number(block.price)
                            }
                            return blockSum
                          }, 0) ?? 0)
                        )
                      }, 0)

                      return (
                        <div
                          key={groupKey}
                          className="border border-border rounded-2xl overflow-hidden"
                        >
                          <Accordion
                            type="multiple"
                            value={openPages}
                            onValueChange={setOpenPages}
                            className="w-full"
                          >
                            <AccordionItem value={`group-${groupKey}`} className="border-0">
                              <AccordionTrigger className="px-4 py-3 bg-muted/30 hover:bg-muted/50 font-semibold">
                                <div className="flex items-center justify-between w-full pr-4">
                                  <span>{groupLabels[groupKey] || groupKey}</span>
                                  {groupTotal > 0 && (
                                    <span className="text-muted-foreground text-sm font-normal">
                                      {formatPrice(groupTotal)}
                                    </span>
                                  )}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-0">
                                <Accordion
                                  type="multiple"
                                  value={openPages}
                                  onValueChange={setOpenPages}
                                  className="w-full"
                                >
                                  {pagesInGroup.map((page) => {
                                    const pageName = page?.name as string
                                    const blockTotal =
                                      page?.blocks?.reduce((sum, block, blockIndex) => {
                                        const blockKey = `${pageName}-${blockIndex}`
                                        if (selectedBlocks.has(blockKey) && block?.price) {
                                          return sum + Number(block.price)
                                        }
                                        return sum
                                      }, 0) ?? 0

                                    return (
                                      <AccordionItem
                                        key={pageName}
                                        value={pageName}
                                        className="border-b last:border-0"
                                      >
                                        <AccordionTrigger className="text-base font-medium py-3">
                                          <div className="flex items-center justify-between w-full pr-4">
                                            <span>{pageName}</span>
                                            {blockTotal > 0 && (
                                              <span className="text-muted-foreground text-sm font-normal">
                                                {formatPrice(blockTotal)}
                                              </span>
                                            )}
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          {page.blocks && page.blocks.length > 0 ? (
                                            <div className="pt-2 pb-4 space-y-2">
                                              {page.blocks
                                                .filter((block) => block?.blockName)
                                                .map((block, blockIndex) => {
                                                  const blockKey = `${pageName}-${blockIndex}`
                                                  const isSelected = selectedBlocks.has(blockKey)
                                                  return (
                                                    <div
                                                      key={blockIndex}
                                                      className="text-muted-foreground flex items-center justify-between text-sm py-1"
                                                    >
                                                      <div className="flex items-center gap-2">
                                                        <Checkbox
                                                          checked={isSelected}
                                                          onCheckedChange={() =>
                                                            toggleBlock(pageName, blockIndex)
                                                          }
                                                          id={`block-${blockKey}`}
                                                        />
                                                        <label
                                                          htmlFor={`block-${blockKey}`}
                                                          className="cursor-pointer"
                                                        >
                                                          {block.blockName}
                                                        </label>
                                                      </div>
                                                      {block.price && block.price > 0 && (
                                                        <span>{formatPrice(block.price)}</span>
                                                      )}
                                                    </div>
                                                  )
                                                })}
                                            </div>
                                          ) : (
                                            <p className="text-muted-foreground text-sm pt-2 pb-4">
                                              {t('noBlocks')}
                                            </p>
                                          )}
                                        </AccordionContent>
                                      </AccordionItem>
                                    )
                                  })}
                                </Accordion>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              )
            })()}
        </div>

        {/* Pricing Card */}
        <div className="lg:w-96">
          <Card className="rounded-3xl border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground text-lg font-medium">
                {t('summaryTitle')}
              </CardTitle>
              <div className="mt-4">
                <div className="text-muted-foreground text-5xl font-semibold tracking-tight">
                  {formatPrice(totalPrice)}
                </div>
                <div className="text-muted-foreground text-xs">{t('totalLabel')}</div>
              </div>
            </CardHeader>

            <CardContent className="px-7 pt-6">
              <p className="text-muted-foreground text-sm">
                {selectedSubcategory
                  ? t('selectedConfiguration', { name: selectedSubcategory.name })
                  : t('selectCategoryToSeePrice')}
              </p>

              {/* Price breakdown by groups */}
              {selectedSubcategory && totalPrice > 0 && (
                <div className="mt-6 space-y-2">
                  <Accordion type="single" collapsible className="w-full">
                    {Object.entries(groupPrices)
                      .filter(([_, price]) => price > 0)
                      .map(([groupKey, price]) => (
                        <AccordionItem
                          key={groupKey}
                          value={groupKey}
                          className="border-b border-border"
                        >
                          <AccordionTrigger className="py-2 text-sm hover:no-underline">
                            <div className="flex items-center justify-between w-full pr-4">
                              <span className="text-muted-foreground">
                                {groupLabels[groupKey] || groupKey}
                              </span>
                              <span className="text-foreground font-medium">
                                {formatPrice(price)}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-4">
                            <div className="space-y-2">
                              {selectedSubcategory.pages
                                ?.filter((page) => (page?.group || 'stranky') === groupKey)
                                .map((page) => {
                                  const pageName = page?.name as string
                                  const pageTotal =
                                    page?.blocks?.reduce((sum, block, blockIndex) => {
                                      const blockKey = `${pageName}-${blockIndex}`
                                      if (selectedBlocks.has(blockKey) && block?.price) {
                                        return sum + Number(block.price)
                                      }
                                      return sum
                                    }, 0) ?? 0

                                  if (pageTotal === 0) return null

                                  return (
                                    <div
                                      key={pageName}
                                      className="flex items-center justify-between text-xs text-muted-foreground"
                                    >
                                      <span>{pageName}</span>
                                      <span>{formatPrice(pageTotal)}</span>
                                    </div>
                                  )
                                })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </div>
              )}

              <Button
                className="h-10 mt-6 w-full hover:scale-105 transition-all duration-200"
                variant="default"
              >
                {t('continue')}
              </Button>

              <div className="relative mb-4 mt-12 flex items-center justify-center overflow-hidden">
                <Separator />
                <span className="text-muted-foreground px-3 text-xs opacity-50">
                  {t('includedLabel')}
                </span>
                <Separator />
              </div>

              <ul className="mt-6 space-y-4">
                {includedKeys.map((key) => (
                  <li key={key} className="flex items-center">
                    <BadgeCheck className="text-muted-foreground size-6 shrink-0" />
                    <span className="text-muted-foreground ml-3 text-sm">
                      {t(`includedItems.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export { ConfiguratorBlock }
