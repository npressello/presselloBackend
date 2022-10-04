const fs = require('fs');

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
    this.items = this.readData(this.fileName); // Primero se intenta leer el archivo, si existe, para traer los objetos que contiene
  }

  // Primero se lee el archivo, sino existe se genera un nuevo id segun la cantidad de objetos o el id maximo que tenga alguno de los elementos
  // Luego suma el item al array de objetos y lo escribe en el archivo
  async save(obj) {
    try {
      const readFile = await this.getAll();
      if (!readFile) {
        obj.id = await this.getNewId();
        this.objects.push(obj);
        this.writeData(this.objects);
        return obj.id;
      }
      this.objects = readFile;
      obj.id = await this.getNewId();
      this.objects.push(obj);
      this.writeData(this.objects);
      return obj.id;
    } catch (err) {
      console.log(err);
    }
  }

  // Lee el archivo y obtiene todos los items. Retorna el objeto con el id seleccionado, sino null
  async getById(id) {
    try {
      this.objects = await this.getAll();
      const obj = this.objects.find(el => el.id === Number(id));
      return obj ? obj : null;
    } catch (err) {
      console.log(err);
    }
  }

  // Lee el archivo y retorna todos los items
  async getAll() {
    try {
      const data = await this.readData(this.fileName);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  // Lee el archivo y obtiene todos los items. Remueve el id elegido y guarda nuevamente los objetos sin ese item
  async deleteById(id) {
    console.log("Entro a deleteById");
    try {
      this.objects = await this.getAll();
      this.objects = this.objects.filter(el => el.id != Number(id));
      this.writeData(this.objects);
    } catch (err) {
      console.log(err);
    }
  }

  // Lee el archivo se lee el archivo para verificar si tiene algun item
  // Se crea arreglo vacio y se graba en el archivo
  async deleteAll() {
    console.log("Entro a deleteAll");
    try {
      this.objects = await this.getAll();
      this.objects = [];
      this.writeData(this.objects);
    } catch (err) {
      console.log(err);
    }
  }

  // Funciones utilitarias de uso interno de la clase
  readData(path) {
    console.log("Entro a readData");
    try {
      const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
      return data;
    } catch (err) {
      return [];
    }
  }

  writeData(items) {
    console.log("Entro a writeData");
    fs.writeFileSync(this.fileName, JSON.stringify(items, null, 2));
  }

  // Obtiene nuevo id, dependiendo la cantidad de items en el archivo.
  // Si uno de los items tiene un id maximo mayor a la cantidad de elementos, entonces el nuevo id es maxId + 1
  async getNewId() {
    try {
      this.objects = await this.getAll() || [];
      let maxId = this.objects.length;
      this.objects.forEach(el => {
        el.id > maxId ? maxId = el.id : maxId
      })
      return maxId + 1;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Contenedor;