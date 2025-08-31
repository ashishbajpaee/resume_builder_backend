import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import fetch from 'node-fetch';

const router = express.Router();

// ATS Score endpoint
router.post('/score', protect, async (req, res) => {
    try {
        const response = await fetch('https://api.apyhub.com/sharpapi/api/v1/hr/parse_resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apy-token': process.env.APY_HUB_API_KEY
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('ATS Score Error:', error);
        res.status(500).json({ message: 'Failed to get ATS score', error: error.message });
    }
});

export default router;
