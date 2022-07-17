const aiSpeed = .02

export default class Paddle {
    constructor(paddlejs) {
        this.paddlejs = paddlejs;
        this.reset()
    }

    get position() {
        return parseFloat(
            getComputedStyle(this.paddlejs).getPropertyValue("--position")
        )
    }

    set position(value) {
        this.paddlejs.style.setProperty("--position", value);
    }

    hit() {
        return this.paddlejs.getBoundingClientRect()
    }

    reset() {
        this.position = 50;
    }

    update(delta, ballHeight) {
        this.position += aiSpeed * delta * (ballHeight - this.position)
    }
}