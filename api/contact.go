package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"strings"
)

type contactBody struct {
	Name    string `json:"name"`
	Phone   string `json:"phone"`
	Email   string `json:"email"`
	City    string `json:"city"`
	Size    string `json:"size"`
	Message string `json:"message"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var body contactBody
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"status":"error"}`))
		return
	}

	name := strings.TrimSpace(body.Name)
	email := strings.TrimSpace(body.Email)
	if name == "" || email == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"status":"error"}`))
		return
	}

	if err := sendEmail(name, body.Phone, email, body.City, body.Size, body.Message); err != nil {
		log.Printf("contact email error: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"status":"error"}`))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"status":"success"}`))
}

func sendEmail(name, phone, email, city, size, message string) error {
	host := os.Getenv("SMTP_HOST")
	port := os.Getenv("SMTP_PORT")
	user := os.Getenv("SMTP_USER")
	pass := os.Getenv("SMTP_PASS")
	to := os.Getenv("CONTACT_EMAIL")
	if to == "" {
		to = "hello@woodcraft.bg"
	}
	emailBody := fmt.Sprintf(
		"Ново запитване от Wood&Craft уебсайта\n\n"+
			"Имена: %s\nТелефон: %s\nИмейл: %s\nГрад: %s\nРазмер: %s кв.м\n\nСъобщение:\n%s",
		name, phone, email, city, size, message,
	)
	if host == "" || user == "" {
		log.Printf("=== Ново запитване (dev mode) ===\n%s\n", emailBody)
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
		user, to, emailBody,
	))
	return smtp.SendMail(host+":"+port, auth, user, []string{to}, msg)
}
