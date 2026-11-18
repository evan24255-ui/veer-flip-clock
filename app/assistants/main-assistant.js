function MainAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
    this.timer = null;
    this.lastTime = "";
    this.testDigit = 0;
}

MainAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
    this.controller.stageController.setWindowOrientation("free");

    this.updateClock();
    this.timer = setInterval(
        this.updateClock.bind(this),
        1000
    );
};

MainAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

MainAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

MainAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
    if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
    }
};

MainAssistant.prototype.updateClock = function() {
    var now = new Date();

    var hours = ("0" + now.getHours()).slice(-2);
    var minutes = ("0" + now.getMinutes()).slice(-2);
    var seconds = ("0" + now.getSeconds()).slice(-2);

    var time = hours + minutes;
// 每3秒触发一次动画
//     var time = hours + minutes + Math.floor(now.getSeconds() / 5); // todo:sy 调试

    if (time === this.lastTime) return;

    this.lastTime = time;

    this.flipDigit("hour-tens", hours.charAt(0));
    this.flipDigit("hour-ones", hours.charAt(1));
    this.flipDigit("minute-tens", minutes.charAt(0));
    this.flipDigit("minute-ones", minutes.charAt(1));
       // this.flipDigit("minute-ones", String(this.testDigit));  // 临时使用秒的个位测试 todo:sy
    this.testDigit = (this.testDigit + 1) % 10;

};

MainAssistant.prototype.flipDigit = function(id, value) {
    var element = document.getElementById(id);
    if (!element) return;

    var top = element.querySelector(".digit-top span");
    var bottom = element.querySelector(".digit-bottom span");
    var front = element.querySelector(".flip-front span");
    var back = element.querySelector(".flip-back span");

    if (!top || !bottom || !front || !back) return;

    var oldValue = top.innerHTML;

    // 数字没有变化，不需要动画
    if (oldValue === value) return;

    // 准备动画的旧数字和新数字
    front.innerHTML = oldValue;
    back.innerHTML = value;

    // 确保动画从初始状态开始
    element.className = element.className.replace(/\bis-flipping\b/g, "");
    element.offsetWidth;

    // 触发翻页
    element.className += " is-flipping";

    var self = this;
    console.log("flipDigit:", id, oldValue, "->", value);
    // 动画结束后更新静态图层
    setTimeout(function() {
        // 先更新静态数字
        top.innerHTML = value;
        bottom.innerHTML = value;

        // 同步动画图层，避免旧数字残留
        front.innerHTML = value;
        back.innerHTML = value;

        // 最后复位动画状态
        element.className = element.className.replace(/\bis-flipping\b/g, "");
    }, 1550); // todo:sy 550
};