import fs from "node:fs";
import path from "node:path";

const process = require("node:process");

const componentName = process.argv[2];

if (!componentName) {
  console.warn("Пожалуйста, укажите название компонента с большой буквы.");
  process.exit(1);
}

const componentNameLowerCase = componentName.toLowerCase();
const sourceDir = path.join("src", "6_shared", "ui");
const targetDir = path.join(sourceDir, componentName);

if (!fs.existsSync(sourceDir)) {
  console.warn(`Папка ${sourceDir} не существует.`);
  process.exit(1);
}

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir).filter(file => file.startsWith(componentNameLowerCase));

if (files.length === 0) {
  console.warn(`Не найдено файлов для компонента с названием ${componentNameLowerCase}.`);
  process.exit(1);
}

files.forEach((file) => {
  const oldPath = path.join(sourceDir, file);
  const newFileName = file.replace(componentNameLowerCase, componentName);
  const newPath = path.join(targetDir, newFileName);

  let content = fs.readFileSync(oldPath, "utf8");
  content = content.replace("import { cn } from \"src/lib/utils\"", "import { cn } from \"@shared/model/lib\"");

  fs.writeFileSync(newPath, content, "utf8");
  fs.unlinkSync(oldPath);
});

console.warn(`Компонент ${componentName} успешно переименован, перемещён и обновлён.`);
