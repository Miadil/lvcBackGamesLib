const express = require("express")
const mysql = require("../config/db")

const router = express.Router()

router.get("/", (req, res) => {
	const sql = "SELECT * FROM games"
	mysql.query(sql, (err, result) => {
		if (err) {
			res.status(500).send("Error retrieving data from database")
		} else {
			res.status(200).json(result)
		}
	})
})
router.post("/", (req, res) => {
	const sql =
		"INSERT INTO `games` (`gamesName`, `year`, `image`) VALUES (?, ?, ?)"
	const values = [req.body.name, req.body.year, req.body.image]
	mysql.query(sql, values, (err, result) => {
		if (err) {
			res.status(500).send("Error retrieving data from database")
		} else {
			res.status(200).json(result)
		}
	})
})

router.put("/:id", (req, res) => {
	const { name, year, image } = req.body
	const { id } = req.params
	const sql =
		"UPDATE `games` SET `gamesName` = ?, `year` = ?, `image` = ? WHERE (`id` = ?);"
	const values = [name, year, image, id]
	mysql.query(sql, values, (err, result) => {
		if (err) {
			res.status(500).send("Error retrieving data from database")
		} else {
			res.status(200).json(result)
		}
	})
})

router.delete("/:id", (req, res) => {
	const { id } = req.params
	const sql = "DELETE FROM `games` WHERE (`id` = ?);"

	mysql.query(sql, [id], (err, result) => {
		if (err) {
			res.status(500).send("Error retrieving data from database")
		} else {
			res.status(200).json(result)
		}
	})
})

module.exports = router
