import fastify from "fastify";
import cors from "@fastify/cors";
import { userController } from "./controller/UserController";
import authJwt from "./middleware/authJwt";
import fastifySwagger from "@fastify/swagger";
import { swaggerConfig } from "./config/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { productController } from "./controller/ProductController";
import { productionController } from "./controller/ProductionController";
import { qualityController } from "./controller/QualityController";
import { maintenanceController} from "./controller/MaintenanceController";

const app = fastify();

app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

app.register(fastifySwagger, swaggerConfig as any);
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: { docExpansion: "list" },
});

app.register(authJwt);
app.register(userController);
app.register(productController);
app.register(productionController);
app.register(qualityController);
app.register(maintenanceController)

const PORT = 3333;
app.listen({ port: PORT }).then(() => {
  console.log(`Backend rodando na porta ${PORT}!`);
});
