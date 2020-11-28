module.exports ={
    PORT: process.env.PORT || 8080,
    DATABASE: process.env.DATABASE || "mongodb://localhost:27017/jolt",
    JWT_SECRET:process.env.JWT_SECRET || 'hellotherewelcme',
    JWT_EXPIRY:process.env.JWT_EXPIRY || '1d'
}