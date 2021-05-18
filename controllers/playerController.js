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
            res.status(200).json(foundPlayers)
        } else {
            const foundPlayers = await Player.find({...filters});
            res.status(200).json(foundPlayers)
        }  
    }catch(error){
        res.status(400).json({
            msg: error.message
        })
    }
})

// Create
router.post('/', async (req, res) => {
    try {
        const createdPlayer = await Player.create(req.body)
        res.status(200).json(createdPlayer)
    } catch(err){
        res.status(400).json({
            msg: err.message
        })
    }
})

// Show
router.get('/:id', async (req, res) => {
    try {
        const foundPlayers = await Player.findById(req.params.id);
        res.status(200).json(foundBookmark)
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

router.get('/Title/:title/', async (req, res) => {
    try {
        const foundBookmark = await Bookmark.findOne({ title: req.params.title });
        res.status(200).json(foundBookmark)
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

// Update

router.put('/:id', async (req, res) => {
    try {
        const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true } )
        res.status(200).json(updatedBookmark);
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedBookmark);
    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})




module.exports = router