require('dotenv').config()

const imposter = {
    user_id: 27,
    username: 'sallydodiddle',
    password: '$2a$10$TmRDDjhmUax9lxVlMRk9VOinPiIj9/V7vxYuy/lfdzj2FpGWUQPna',
    img: 'https://robohash.org/sallydodiddle'
}

module.exports = {
    bypassAuthInDevelopment: (req, res, next) => {
        if(!req.session.user && process.env.NODE_ENV === 'development') {
            req.session.user = imposter
        }
        next()
    }
}