import { FileController } from "@/server/controller/file.controller";
import { adminRoute } from "@/server/http/route";

export const POST = adminRoute(FileController.uploadImage);
