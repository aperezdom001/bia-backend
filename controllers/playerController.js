const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// Index
router.get('/', async (req, res) => {
  
    let filters;
    if(Object.keys(req.query).length > 0){
        filters = {...req.query}
    }
    try {
        if(!filters){
            const foundPlayers = await Player.find({});
            res.status(200).json(foundPlayers);
        } else {
            const foundPlayers = await Player.find({...filters});
            res.status(200).json(foundPlayers);
        }  
    }catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
});

// Create
router.post('/', async (req, res) => {
    try {
        const createdPlayer = await Player.create(req.body);
        res.status(200).json(createdPlayer);
    } catch(err){
        res.status(400).json({
            msg: err.message
        })
    }
})

// Show
router.get('/id/:id', async (req, res) => {
    try {
        const foundPlayers = await Player.findById(req.params.id);
        res.status(200).json(foundPlayers);
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

router.get('/initials/:initials/', async (req, res) => {
    try {
        const foundPlayer = await Player.findOne({ initials: req.params.initials });
        res.status(200).json(foundPlayer)
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

// Update

router.put('/:id', async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true } )
        res.status(200).json(updatedPlayer);
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deletedPlayer = await Player.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedPlayer);
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})




module.exports = router