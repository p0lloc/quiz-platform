package controller

import (
	"github.com/gofiber/contrib/websocket"
	"quiz.com/quiz/internal/service"
)

type WebsocketController struct {
	netService *service.NetService
}

func Ws(netService *service.NetService) WebsocketController {
	return WebsocketController{
		netService: netService,
	}
}

func (c WebsocketController) Ws(con *websocket.Conn) {
	var (
		mt  int
		msg []byte
		err error
	)
	for {
		if mt, msg, err = con.ReadMessage(); err != nil {
			c.netService.OnDisconnect(con)
			break
		}

		c.netService.OnIncomingMessage(con, mt, msg)

	}
}
