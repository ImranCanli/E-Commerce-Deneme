import React from 'react'

import classes from './index.module.scss'
import { Gutter } from '../../_components/Gutter'
import Filters from './Filters'
import { Category, Page } from '../../../payload/payload-types'
import { draftMode } from 'next/headers'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { HR } from '../../_components/HR'
import { Blocks } from '../../_components/Blocks'

const Products = async () => {

    const {isEnabled : isDraftMode } = draftMode();
    let page: Page | null = null
    let categories: Category[] | null = null

    try {
        page = await fetchDoc<Page>({
            collection: 'pages',
            slug: 'products',
            draft: isDraftMode,
        })

        categories = await fetchDocs<Category>('categories');

    } catch (error) {
        console.log(error);
    }

  return (
    <div className={classes.container}>
        <Gutter className={classes.products}>
            <Filters categories={categories}/>
            <Blocks blocks={page.layout} disableTopPadding={true}/>
        </Gutter>
        <HR />
    </div>
  )
}

export default Products
