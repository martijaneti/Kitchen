package handlers

import "github.com/gofiber/fiber/v2"

func Home(c *fiber.Ctx) error {
	return c.SendFile("./views/index.html")
}

func Gallery(c *fiber.Ctx) error {
	return c.SendFile("./views/gallery.html")
}

func Process(c *fiber.Ctx) error {
	return c.SendFile("./views/process.html")
}
