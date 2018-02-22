# Mailbox

Demo https://vigorous-minsky-7ab739.netlify.com

Адресная книга реализована с использованием Angular Material

Авторизация: admin - admin

<b>Вопрос:</b> - при попытке добавить динамический набор кнопок в тулбар - 
Oшибка:
```
ExpressionChangedAfterItHasBeenCheckedError:
Expression has changed after it was checked.
Previous value: 'ngForOf: '. Current value: 'ngForOf: [object Object],[object Object],[object Object]'.
```

При чем гугл говорит о том что эта ошибка возникает только в Dev режиме - https://github.com/angular/angular/issues/6005#issuecomment-165911194

Еще ссылка - https://github.com/angular/angular/issues/17572

```
In short, after every round of change detection, 
dev mode immediately performs a second round to verify that no bindings have changed since the end of the first, 
as this would indicate that changes are being caused by change detection itself
```
Нарушается односториний поток данных? Решается через обертку в setTimeout - на сколько это хорошо?

```
Why putting the SetTimout doesn't raise the error anymore.
 - You change field asynchronously, which respects one-way data flow.
```
