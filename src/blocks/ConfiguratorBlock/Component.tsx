'use client'

import React, { useState, useEffect } from 'react'
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

type ConfiguratorBlockProps = ConfiguratorBlockType

const ConfiguratorBlock: React.FC<ConfiguratorBlockProps> = (props) => {
  const { categories } = props
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

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="container px-16 py-8">
        <p className="text-muted-foreground">No categories configured</p>
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

  // Calculate total price from selected pages and blocks
  const calculateTotalPrice = () => {
    if (!selectedSubcategory?.pages) return 0
    let total = 0
    selectedSubcategory.pages.forEach((page) => {
      if (page.price) total += page.price
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

  return (
    <div className="container px-16 py-8">
      <h1 className="mb-8 text-4xl font-semibold">Vyskladajte si svoj Web</h1>

      <div className="mb-6 flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Select Category</label>
            <Select value={selectedCategoryName} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a category" />
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

          {selectedCategory && selectedCategory.subcategories && (
            <div>
              <label className="mb-2 block text-sm font-medium">Select Subcategory</label>
              <Select value={selectedSubcategoryName} onValueChange={handleSubcategoryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a subcategory" />
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
          )}

          {selectedSubcategory && selectedSubcategory.pages && (
            <div className="mt-4">
              {selectedSubcategory.description && (
                <p className="text-muted-foreground mb-4 text-sm">
                  {selectedSubcategory.description}
                </p>
              )}
              <Accordion
                type="multiple"
                value={openPages}
                onValueChange={setOpenPages}
                className="w-full"
              >
                {selectedSubcategory.pages
                  .filter((page) => page?.name)
                  .map((page) => {
                    const pageName = page?.name as string
                    const pagePrice = page?.price ?? 0
                    const blockTotal =
                      page?.blocks?.reduce((sum, block, blockIndex) => {
                        const blockKey = `${pageName}-${blockIndex}`
                        if (selectedBlocks.has(blockKey) && block?.price) {
                          return sum + Number(block.price)
                        }
                        return sum
                      }, 0) ?? 0
                    const isOpen = openPages.includes(pageName)

                    return (
                      <AccordionItem key={pageName} value={pageName}>
                        <AccordionTrigger className="text-base font-medium">
                          <div className="flex items-center justify-between w-full pr-4">
                            <span>{pageName}</span>
                            <div className="flex items-center gap-2">
                              {!isOpen ? (
                                <>
                                  <span className="text-muted-foreground text-sm font-normal">
                                    Page: €{pagePrice}
                                  </span>
                                  {blockTotal > 0 && (
                                    <span className="text-muted-foreground text-sm font-normal">
                                      Blocks: €{blockTotal}
                                    </span>
                                  )}
                                </>
                              ) : (
                                <span className="text-muted-foreground text-sm font-normal">
                                  +€{pagePrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {page.blocks && page.blocks.length > 0 ? (
                            <div className="pt-2 space-y-2">
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
                                          onCheckedChange={() => toggleBlock(pageName, blockIndex)}
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
                                        <span>+€{block.price}</span>
                                      )}
                                    </div>
                                  )
                                })}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm pt-2">
                              No blocks configured
                            </p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
              </Accordion>
            </div>
          )}
        </div>

        {/* Pricing Card */}
        <div className="lg:w-96">
          <Card className="rounded-3xl border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground text-lg font-medium">
                Your Configuration
              </CardTitle>
              <div className="mt-4">
                <div className="text-muted-foreground text-5xl font-semibold tracking-tight">
                  €{totalPrice}
                </div>
                <div className="text-muted-foreground text-xs">Total price</div>
              </div>
            </CardHeader>

            <CardContent className="px-7 pt-6">
              <p className="text-muted-foreground text-sm">
                {selectedSubcategory
                  ? `Configured: ${selectedSubcategory.name}`
                  : 'Select a subcategory to see pricing'}
              </p>

              <Button className="mt-6 w-full" variant="default">
                Get Started
              </Button>

              <div className="relative mb-4 mt-12 flex items-center justify-center overflow-hidden">
                <Separator />
                <span className="text-muted-foreground px-3 text-xs opacity-50">INCLUDED</span>
                <Separator />
              </div>

              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <BadgeCheck className="text-muted-foreground size-5" />
                  <span className="text-muted-foreground ml-3 text-sm">All selected blocks</span>
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="text-muted-foreground size-5" />
                  <span className="text-muted-foreground ml-3 text-sm">Full customization</span>
                </li>
                <li className="flex items-center">
                  <BadgeCheck className="text-muted-foreground size-5" />
                  <span className="text-muted-foreground ml-3 text-sm">Priority support</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export { ConfiguratorBlock }
