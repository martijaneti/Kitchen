package handlers

import (
	"fmt"
	"log"
	"net/smtp"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type contactBody struct {
	Name    string `json:"name"`
	Phone   string `json:"phone"`
	Email   string `json:"email"`
	City    string `json:"city"`
	Size    string `json:"size"`
	Message string `json:"message"`
}

func ContactSubmit(c *fiber.Ctx) error {
	var body contactBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error"})
	}

	name := strings.TrimSpace(body.Name)
	email := strings.TrimSpace(body.Email)

	if name == "" || email == "" {
		return c.Status(400).JSON(fiber.Map{"status": "error"})
	}

	if err := sendContactEmail(name, body.Phone, email, body.City, body.Size, body.Message); err != nil {
		log.Printf("contact email error: %v", err)
		return c.Status(500).JSON(fiber.Map{"status": "error"})
	}

	return c.JSON(fiber.Map{"status": "success"})
}

func sendContactEmail(name, phone, email, city, size, message string) error {
	host := os.Getenv("SMTP_HOST")
	port := os.Getenv("SMTP_PORT")
	user := os.Getenv("SMTP_USER")
	pass := os.Getenv("SMTP_PASS")
	to := os.Getenv("CONTACT_EMAIL")

	if to == "" {
		to = "hello@woodcraft.bg"
	}

	body := fmt.Sprintf(
		"Ново запитване от Wood&Craft уебсайта\n\n"+
			"Имена: %s\nТелефон: %s\nИмейл: %s\nГрад: %s\nРазмер: %s кв.м\n\nСъобщение:\n%s",
		name, phone, email, city, size, message,
	)

	if host == "" || user == "" {
		log.Printf("=== Ново запитване (dev mode) ===\n%s\n", body)
		return nil
	}

	if port == "" {
		port = "587"
	}

	auth := smtp.PlainAuth("", user, pass, host)
	msg := []byte(fmt.Sprintf(
		"From: Wood&Craft Website <%s>\r\nTo: %s\r\n"+
			"Subject: Ново запитване — Wood&Craft\r\n"+
			"MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n%s",
		user, to, body,
	))

	return smtp.SendMail(host+":"+port, auth, user, []string{to}, msg)
}
