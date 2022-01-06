import { Category, SocialMediaConstentOptions } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/prisma'
import { fetchReports } from '../../lib/helpers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log(req.method)

switch (req.method) {
  /* create a new report */
  case 'POST':

    try {
      
      const values = req.body
      console.log(values.categories)
      const response = await prisma.report.create({data: {
        ...values,
        categories: {
            connect: values.categories.map((categoryId: string) => ({
                id: categoryId
            }))
        },
        statusChanges: {
            create: {status: "RECEIVED"}
        }
      }})
      res.status(201).json({...response})
      console.log(req.body, response)
    } catch (err) {
      console.log('that went very wrong: ', err)
      res.status(500).json({errorMessage: 'request not correctly formed'})

    }
    break;
  /* get all reports */
  case 'GET':
    console.log('getting reports')
    try {
      const response = await fetchReports()
      res.status(200).json(response)
    } catch(err) {
      console.log('that went very wrong: ', err)
      res.status(500).json({errorMessage: 'request not correctly formed'})
    }

    break;

  default:
    res.status(404)
    break;
}


    

    // Handle any other HTTP method

}