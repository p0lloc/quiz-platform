package controller

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"quiz.com/quiz/internal/entity"
	"quiz.com/quiz/internal/service"
)

type QuizController struct {
	quizService *service.QuizService
}

func Quiz(quizService *service.QuizService) QuizController {
	return QuizController{
		quizService: quizService,
	}
}

func (c QuizController) GetQuizById(ctx *fiber.Ctx) error {
	quizIdStr := ctx.Params("quizId")
	quizId, err := primitive.ObjectIDFromHex(quizIdStr)
	if err != nil {
		return ctx.SendStatus(fiber.StatusBadRequest)
	}

	quiz, err := c.quizService.GetQuizById(quizId)
	if err != nil {
		return err
	}

	if quiz == nil {
		return ctx.SendStatus(fiber.StatusNotFound)
	}

	return ctx.JSON(quiz)
}

type UpdateQuizRequest struct {
	Name      string                `json:"name"`
	Questions []entity.QuizQuestion `json:"questions"`
}

func (c QuizController) UpdateQuizById(ctx *fiber.Ctx) error {

	quizIdStr := ctx.Params("quizId")
	quizId, err := primitive.ObjectIDFromHex(quizIdStr)
	if err != nil {
		return ctx.SendStatus(fiber.StatusBadRequest)
	}

	var req UpdateQuizRequest
	if err := ctx.BodyParser(&req); err != nil {
		return err
	}

	if err := c.quizService.UpdateQuiz(quizId, req.Name, req.Questions); err != nil {
		return err
	}

	return ctx.SendStatus(fiber.StatusOK)
}

func (c QuizController) GetQuizzes(ctx *fiber.Ctx) error {
	quizzes, err := c.quizService.GetQuizzes()
	if err != nil {
		return err
	}

	return ctx.JSON(quizzes)
}
