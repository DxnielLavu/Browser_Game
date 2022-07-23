const aiSpeed = .2

export default class Paddle {
    constructor(paddlejs) {
        this.paddlejs = paddlejs;
        this.reset()
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddlejs).getPropertyValue("--position")
        )
    }

    set position(value) {
        this.paddlejs.style.setProperty("--position", value);
    }

    rect() {
        return this.paddlejs.getBoundingClientRect()
    }

    reset() {
        this.position = 50;
    }

    update(ballHeight) {
        this.position += aiSpeed * (ballHeight - this.position)
    }
}