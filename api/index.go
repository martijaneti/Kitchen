package handler

import (
	"net/http"

	"github.com/gofiber/adaptor/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"woodcraft/handlers"
)

var app *fiber.App

func init() {
	app = fiber.New(fiber.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return c.Status(fiber.StatusInternalServerError).SendString("Internal Server Error")
		},
	})
	app.Use(recover.New())
	app.Static("/static/images", "./static/images")
	app.Static("/assets", "./static/dist/assets")
	app.Post("/contact", handlers.ContactSubmit)
	app.Get("*", func(c *fiber.Ctx) error {
		return c.SendFile("./static/dist/index.html")
	})
}

func Handler(w http.ResponseWriter, r *http.Request) {
	adaptor.FiberApp(app)(w, r)
}
