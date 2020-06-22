# Объектная модель документа

Основой HTML-документа являются теги.

В соответствии с объектной моделью документа (`Document Object Model`, коротко `DOM`), каждый `HTML`-тег является объектом. Вложенные теги являются «детьми» родительского элемента. Текст, который находится внутри тега, также является объектом

[Как выглядит DOM](http://software.hixie.ch/utilities/js/live-dom-viewer)

## Поиск узлов

Для поиска элементов в DOM есть методы `getElementById()`, `querySelector()`, `querySelectorAll()`.

### Поиск по id

Если у элемента есть атрибут id, то мы можем получить его вызовом `document.getElementById(id)`, где бы он ни находился.

Например:

```html
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // получить элемент
  let elem = document.getElementById('elem');

  // сделать его фон красным
  elem.style.background = 'red';
</script>
```

Также есть глобальная переменная с именем, указанным в id:

```html
<div id="elem">
  <div id="elem-content">Элемент</div>
</div>

<script>
  // elem - ссылка на элемент с id="elem"
  elem.style.background = 'red';

  // внутри id="elem-content" есть дефис, так что такой id не может служить именем переменной
  // ...но мы можем обратиться к нему через квадратные скобки: window['elem-content']
</script>
```

…Но это только если мы не объявили в JavaScript переменную с таким же именем, иначе она будет иметь приоритет:

```html
<div id="elem"></div>

<script>
  let elem = 5; // теперь elem равен 5, а не <div id="elem">

  alert(elem); // 5
</script>
```

### Поиск по CSS селекторам

Самый универсальный метод поиска – это `document.querySelectorAll(css)`, он возвращает все элементы внутри elem, удовлетворяющие данному CSS-селектору.

Следующий запрос получает все элементы &lt;li>, которые являются последними потомками в &lt;ul>:

```html
<ul>
  <li>Этот</li>
  <li>тест</li>
</ul>
<ul>
  <li>полностью</li>
  <li>пройден</li>
</ul>
<script>
  let elements = document.querySelectorAll('ul > li:last-child');

  for (let elem of elements) {
    alert(elem.innerHTML); // "тест", "пройден"
  }
</script>
```

### Поиск по CSS селекторам первого элемента

Метод `document.querySelector(css)` возвращает первый элемент, соответствующий данному CSS-селектору.

Иначе говоря, результат такой же, как при вызове `document.querySelectorAll(css)[0]`, но он сначала найдёт все элементы, а потом возьмёт первый, в то время как `document.querySelector` найдёт только первый и остановится. Это быстрее, кроме того, его короче писать.

### getElementsBy*

Существуют также другие методы поиска элементов по тегу, классу и так далее.

На данный момент, они скорее исторические, так как querySelector более чем эффективен.

Здесь мы рассмотрим их для полноты картины, также вы можете встретить их в старом коде.

* `document.getElementsByTagName(tag)` ищет элементы с данным тегом и возвращает их коллекцию. Передав "*" вместо тега, можно получить всех потомков.
* `document.getElementsByClassName(className)` возвращает элементы, которые имеют данный CSS-класс.
* `document.getElementsByName(name)` возвращает элементы с заданным атрибутом name. Очень редко используется.

Итого, есть шесть методов поиска элементов в DOM

<table>
<thead>
<tr>
<td>Метод</td>
<td>Ищет по...</td>
<td>Ищет внутри элемента?</td>
<td>Возвращает живую коллекцию?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag or <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

## Родители, дети, соседи

DOM позволяет нам делать что угодно с элементами и их содержимым, но для начала нужно получить соответствующий DOM-объект.

Все операции с DOM начинаются с объекта document. Это главная «точка входа» в DOM. Из него мы можем получить доступ к любому узлу.

Так выглядят основные ссылки, по которым можно переходить между узлами DOM:

![Отношения между узлами DOM](https://learn.javascript.ru/article/dom-navigation/dom-links.svg)

Самые верхние элементы дерева доступны как свойства объекта **document**:

Самый верхний узел документа: document.documentElement. В DOM он соответствует тегу &lt;html>.

```html
<html> = document.documentElement
```

Другой часто используемый DOM-узел – узел тега &lt;body>: document.body.

```html
<body> = document.body
```

Тег &lt;head> доступен как document.head.

```html
<head> = document.head
```

Коллекция `childNodes` содержит список всех детей.

Свойства `firstChild` и `lastChild` обеспечивают быстрый доступ к первому и последнему дочернему элементу.

Соседи – это узлы, у которых один и тот же родитель.

Например, здесь &lt;head> и &lt;body> соседи:

```html
<html>
  <head>...</head><body>...</body>
</html>
```

* говорят, что &lt;body> – «следующий» или «правый» сосед &lt;head>
* также можно сказать, что &lt;head> «предыдущий» или «левый» сосед &lt;body>.

Следующий узел того же родителя (следующий сосед) – в свойстве `nextSibling`, а предыдущий – в `previousSibling`.

Родитель доступен через `parentNode`.

Навигационные свойства, описанные выше, относятся ко всем узлам в документе. В частности, в `childNodes` находятся и текстовые узлы и узлы-элементы и узлы-комментарии, если они есть.

Но для большинства задач текстовые узлы и узлы-комментарии нам не нужны. Мы хотим манипулировать узлами-элементами, которые представляют собой теги и формируют структуру страницы.

Поэтому давайте рассмотрим дополнительный набор ссылок, которые учитывают только узлы-элементы:

![DOM Links elements](https://learn.javascript.ru/article/dom-navigation/dom-links-elements.svg)

Эти ссылки похожи на те, что раньше, только в ряде мест стоит слово `Element`:

* `children` – коллекция детей, которые являются элементами.
* `firstElementChild`, `lastElementChild` – первый и последний дочерний элемент.
* `previousElementSibling`, `nextElementSibling` – соседи-элементы.
* `parentElement` – родитель-элемент.

# Манипулирование DOM

Модификации DOM – это ключ к созданию «живых» страниц.

Здесь мы увидим, как создавать новые элементы «на лету» и изменять уже существующие.

## Пример: показать сообщение

Рассмотрим методы на примере – а именно, добавим на страницу сообщение, которое будет выглядеть получше, чем `alert`.

Вот такое:

```html
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert">
  <strong>Всем привет!</strong> Вы прочитали важное сообщение.
</div>
```

Это был пример `HTML`. Теперь давайте создадим такой же `div`, используя `JavaScript` (предполагаем, что стили в `HTML` или во внешнем `CSS`-файле).

### Создание элемента

`DOM`-узел можно создать двумя методами:

```javascript
document.createElement(tag)
```

Создаёт новый элемент с заданным тегом:

```javascript
let div = document.createElement('div');
```

и

```javascript
document.createTextNode(text)
```

Создаёт новый текстовый узел с заданным текстом:

```javascript
let textNode = document.createTextNode('А вот и я');
```

## Создание сообщения

В нашем случае сообщение – это `div` с классом `alert` и `HTML` в нём:

```javascript
let div = document.createElement('div');
div.className = "alert";
div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";
```

Мы создали элемент, но пока он только в переменной. Мы не можем видеть его на странице, поскольку он не является частью документа.

В приведенном выше примере для добавление содержимого элемента `div` используется атрибут `innerHTML`.
Такой способ не рекомендуется ввиду того, что содержит ряд недостатков.

### Методы вставки

Чтобы наш `div` появился, нам нужно вставить его где-нибудь в `document`. Например, в `document.body`.

Для этого есть метод `append`, в нашем случае: `document.body.append(div)`.

Вот полный пример:

```html
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";

  document.body.append(div);
</script>
```

Вот методы для различных вариантов вставки:

* `node.append(...nodes or strings)` – добавляет узлы или строки в конец node,
* `node.prepend(...nodes or strings)` – вставляет узлы или строки в начало node,
* `node.before(...nodes or strings)` –- вставляет узлы или строки до node,
* `node.after(...nodes or strings)` –- вставляет узлы или строки после node,
* `node.replaceWith(...nodes or strings)` –- заменяет node заданными узлами или строками.

Вот пример использования этих методов, чтобы добавить новые элементы в список и текст до/после него:

```html
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // вставить строку "before" перед <ol>
  ol.after('after'); // вставить строку "after" после <ol>

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // вставить liFirst в начало <ol>

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // вставить liLast в конец <ol>
</script>
```

Наглядная иллюстрация того, куда эти методы вставляют:

![before-prepend-append-after.svg](https://learn.javascript.ru/article/modifying-document/before-prepend-append-after.svg)

Итоговый список будет таким:

```javascript
before
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
after
```

### Удаление узлов

Для удаления узла есть методы `node.remove()`.

Например, сделаем так, чтобы наше сообщение удалялось через секунду:

```html
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Всем привет!</strong> Вы прочитали важное сообщение.";

  document.body.append(div);
  setTimeout(() => div.remove(), 1000);
</script>
```

Таким образом:

Методы для создания узлов:

* `document.createElement(tag)` – создаёт элемент с заданным тегом,
* `document.createTextNode(value)` – создаёт текстовый узел (редко используется),
* `elem.cloneNode(deep)` – клонирует элемент, если deep==true, то со всеми дочерними элементами.

Вставка и удаление:

* `node.append(...nodes or strings)` – вставляет в node в конец,
* `node.prepend(...nodes or strings)` – вставляет в node в начало,
* `node.before(...nodes or strings)` –- вставляет прямо перед node,
* `node.after(...nodes or strings)` –- вставляет сразу после node,
* `node.replaceWith(...nodes or strings)` –- заменяет node.
* `node.remove()` –- удаляет node.
