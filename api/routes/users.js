const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();

// Signup Route

router.post('/signup', async (req, res)=>{
    try {
        //getting body data
        const {first_name, last_name, email, password, country} = req.body;
        console.log(req.body)

        //hashing password before storing
        const hashed = await bcrypt.hash(password, 12);

        //storing data to mysql
        const query = 'INSERT INTO ecommerce_users (first_name, last_name, email, password, country) VALUES(?, ?, ?, ?, ?)';
        const values = [first_name, last_name, email, hashed, country];

        const [result] = await db.query(query, values);

        //getting data back
        const userId = result.insertId;
        const [user] = await db.query('SELECT * FROM ecommerce_users WHERE id = ?', [userId]);

        //generating token
        const token = jwt.sign(
            {
                email: user[0].email,
                first_name: user[0].first_name,
                last_name: user[0].last_name,
                country: user[0].country
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
        
        //data in response too
        res.status(201).json({user: user[0], token: token});
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.post('/login', async (req, res)=>{
    try {
        //getting data from
        const {email, password} = req.body;
        console.log(req.body)
        
        //checking if user exists
        const [user] = await db.query('SELECT * FROM ecommerce_users WHERE email = ?', [email]);
        
        //if not exist err 404
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        
        //else check password
        const isMatch = await bcrypt.compare(password, user[0].password);
        
        if (!isMatch) {
            return res.status(401).json({message: 'Incorrect password'});
        }
        
        //generating token
        const token = jwt.sign(
            {
                email: user[0].email,
                first_name: user[0].first_name,
                last_name: user[0].last_name,
                country: user[0].country
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({user: user[0], token: token});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// To verify token

router.get('/auth', (req, res) => {
    const authHeader = req.headers.authorization;

    // Check if the authorization header is present and formatted correctly
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.json({ 
            message: 'Authenticated successfully', 
            user: decoded 
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
});

module.exports = router;