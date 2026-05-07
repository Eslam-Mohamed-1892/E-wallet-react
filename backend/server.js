const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/login", (req, res) => {
    const { phone } = req.body

    if (phone === "01143676424") {
        return res.json({ name: "Eslam" })
    }

    return res.status(401).json({ message: "Invalid user" })
})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})