import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/user';

/** @namespace config.jwt */

const signup = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, message: 'Please pass username and password.'});
    } else {
        let newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save((err) => {
            if (err) {
                return res.json({success: false, message: 'Username already exists.'});
            }
            res.json({success: true, message: 'Successful created new user.'});
        });
    }
};

const signin = (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, message: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    let token = jwt.sign({
                        _id: user._id
                    }, config.jwt.secret, {expiresIn: '1h'});
                    // return the information including token as JSON
                    res.status(200).send({
                        user: user,
                        token: token,
                        expires_in: 3600
                    });
                } else {
                    res.status(401).send({success: false, message: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
};

const refresh_token = (req, res) => {
    console.log(req.query.token);
    jwt.verify(req.query.token, config.jwt.secret, (err, user) => {
        if (err) {
            return res.json(err);
        }
        if (user._id) {
            let token = jwt.sign({
                _id: user._id
            }, config.jwt.secret, {expiresIn: '1h'});
            res.json({
                token: token,
                expires_in: 3600
            });
        }
    });
};

export {signup, signin, refresh_token};
