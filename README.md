# Mailbox

Demo https://vigorous-minsky-7ab739.netlify.com

Адресная книга реализована с использованием Angular Material

Авторизация: admin - admin

Запуск:
```
cd ./dev/mailbox
ng serve
```

Build
```
$ cd ./dev/mailbox
$ ng build --prod -op=../../public
```

<hr>

**Вопрос №1:** - При попытке добавить динамический набор кнопок в тулбар
 - /dev/mailbox/src/app/mailbox/mailbox.component.ts [ln: 63] - *проблема не правильной архитектуры?*

Oшибка:
```
ExpressionChangedAfterItHasBeenCheckedError:
Expression has changed after it was checked.
Previous value: 'ngForOf: '. Current value: 'ngForOf: [object Object],[object Object],[object Object]'.
```

При чем гугл говорит о том что эта ошибка возникает только в Dev режиме - https://github.com/angular/angular/issues/6005#issuecomment-165911194

>In short, after every round of change detection, 
>dev mode immediately performs a second round to verify that no bindings have changed since the end of the first, 
>as this would indicate that changes are being caused by change detection itself

***Нарушается односториний поток данных? Решается через обертку в setTimeout - на сколько это хорошо?***

Еще ссылка - https://github.com/angular/angular/issues/17572

>Why putting the SetTimout doesn't raise the error anymore.
>You change field asynchronously, which respects one-way data flow.



**Вопрос №2:** - Реакция тулбара, если выбрать письмо в списке и перейти в письмо
    не верно спроектирован тулбар?

Ошибка: `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. 
Previous value: 'ngIf: true'. Current value: 'ngIf: false'.`



**Вопрос №3** - Отладка приложения - инфо в консоле:

```
DebugContext_ {view: {…}, nodeIndex: 32, nodeDef: {…}, elDef: {…}, elView: {…}}
component:(...)
componentRenderElement:(...)
context:(...)
elDef:{nodeIndex: 31, parent: {…}, renderParent: {…}, bindingIndex: 10, outputIndex: 3, …}
elOrCompView:(...)
elView:{def: {…}, parent: {…}, viewContainerParent: null, parentNodeDef: {…}, context: MailboxComponent, …}
injector:(...)
nodeDef:{nodeIndex: 32, parent: {…}, renderParent: {…}, bindingIndex: 10, outputIndex: 3, …}
nodeIndex:32
providerTokens:(...)
references:(...)
renderNode:(...)
view:{def: {…}, parent: {…}, viewContainerParent: null, parentNodeDef: {…}, context: MailboxComponent, …}
__proto__:Object
```
