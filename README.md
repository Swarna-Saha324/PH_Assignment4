Answers to Questions
1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans: getElementById selects an element by its Unique ID. Example: document.getElementById("header").
     getElementByClassName selects an element by its class name. Example:document.getElementsByClassName("box").
     queryselectors Selects the first element matching CSS selector.Example: document.querySelector(".box").
     querySelectorAll()  Selects all elements matching CSS selector. It is a node list. Example: document.queryselectorAll("h1").
2. How do you create and insert a new element into the DOM?
   Create element: const ele = document.createElement("p");
                   ele.innertext="I am a good person";
                   document.body.appendchild(ele);   
   
3. What is Event Bubbling? And how does it work?
   Ans:Event Bubbling is when an event starts from the target element and bubbles up to its parent elements.
       It works in  a process in JavaScript where an event starts from the target element and then propagates (moves) upward to its parent elements, one by one, until it reaches the root (document).
4. What is Event Delegation in JavaScript? Why is it useful?
   Ans:Event Delegation is a technique where you add event listener to a parent instead of multiple child elements.
   It is useful because:
   1.Improve performane
   2.Less code
   3.Work it dianamically.
5. What is the difference between preventDefault() and stopPropagation() methods?
   Ans:preventDefault():Stops default browser behavior.
       stopPropagation():Stops event bubbling.
   
