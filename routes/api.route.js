const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {category: true},
    })

    const categories = await prisma.category.findMany({
      include: {products: true},
    })

    res.json({products, categories})
  } catch (error) {
    next(error)
  }
});

router.get('/products/:id', async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({
          where: {
            id: Number(req.params.id)
            }
        })
        res.json(product)
    } catch (error) {
        next(error)
    }
   })

router.post('/products', async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        createdAt: req.body.createdAt,
        categoryId: req.body.categoryId
      }
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: Number(req.params.id),
        },
    })
    res.json(product)
} catch (error) {
    next(error)
}
});

router.patch('/products', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
