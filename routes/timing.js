const express = require('express');
const Timing = require('../models/timing');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let timing = await Timing.find({});

    if (timing.length === 0) {
      const defaultTiming = await Timing.create({
        morning: { open: 6, close: 11 },
        evening: { open: 4, close: 9 }
      });
      timing = [defaultTiming];
    }

    res.status(200).json({ success: true, timing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', async(req,res)=>{
    try {
        const updatedTiming = await Timing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(updatedTiming)
    } catch (error) {
         res.status(500).json({ error: 'Failed to update timing' });
    }
})

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const { morning, evening } = req.body;

    // Basic validation
    if (!morning || !evening) {
      return res.status(400).json({ success: false, message: 'Morning and evening timings are required' });
    }

    const newTiming = await Timing.create({
      morning: {
        open: morning.open,
        close: morning.close
      },
      evening: {
        open: evening.open,
        close: evening.close
      }
    });

    res.status(201).json({ success: true, timing: newTiming });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to insert timing' });
  }
});


module.exports = router;