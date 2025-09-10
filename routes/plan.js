const express = require('express');
const Plan = require('../models/plans');

const router = express.Router();

router.get('/:category', async(req,res)=>{
    try {
        const category = req.params.category;
    const plans = await Plan.find({ category: category });
        console.log(plans)
        return res.status(200).json(plans);
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async (req, res) => {
  const { category, level, price, validity, benefits } = req.body;
  const existing = await Plan.findOne({ category, level });

  if (existing) {
    existing.price = price;
    existing.validity = validity;
    existing.benefits = benefits;
    await existing.save();
    return res.json({ message: 'Plan updated successfully' });
  }

  const plan = new Plan({ category, level, price, validity, benefits });
  await plan.save();
  res.json({ message: 'Plan created successfully' });
});

router.put('/:id', async (req, res) => {
  try {
    const { price, validity, benefits, monthlyPricing } = req.body;

    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      {
        price,
        validity,
        benefits,
        monthlyPricing
      },
      { new: true }
    );

    res.json(updatedPlan);
  } catch (err) {
    res.status(500).json({ error: 'Error updating plan' });
  }
});


module.exports = router;