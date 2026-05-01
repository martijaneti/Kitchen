package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"woodcraft/handlers"
)

func main() {
	app := fiber.New(fiber.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return c.Status(fiber.StatusInternalServerError).SendString("Internal Server Error")
		},
	})

	app.Use(logger.New())
	app.Use(recover.New())

	// Kitchen photos served under /static/images/
	app.Static("/static/images", "./static/images")

	// Vite build assets
	app.Static("/assets", "./static/dist/assets")

	// Contact form API
	app.Post("/contact", handlers.ContactSubmit)

	// SPA catch-all — serves index.html for every other route
	app.Get("*", func(c *fiber.Ctx) error {
		return c.SendFile("./static/dist/index.html")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	log.Fatal(app.Listen(":" + port))
}
