//Act 1
function startGame(){
  ColdMailadd(0);
  openProgram('Coldmail');
  settings.progress=1;
  permissions.sendChat=true;
  setTimeout(function(){
    addMessage('Jack462','Test');
    setTimeout(function(){
      addMessage('Jack462','Does this work?');
    },12000)
    setTimeout(function(){
      addMessage('Jack462','Can you confirm?');
    },18000)
    setTimeout(function(){
      addMessage('Jack462','Why did you change your name to Undefined?');
      setNotepad('To-do list:&#13;&#10;- Change username&#13;&#10;- Investigate why there is no internet connection&#13;&#10;- Attempt to talk to Jack');
      openProgram('Notepad');
      changePermission(true,'User_Account');
    },26000)
  },15000);
}

//Act 2
function act2(){
  settings.progress=2;
  addMessage('Jack462','Wow so my messages ARE coming through '+settings.username+'!');
  setNotepad('');
}

//Act 3


//Act 4


//Act 5
