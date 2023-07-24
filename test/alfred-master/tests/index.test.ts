import alfred from "../src/index";

// const arr: string[] = ["cat", "dog", "bat"];

describe("测试alfred方法功能", () => {
    test("测试log", () => {
        alfred.log('测试一下log方法');
    });
    test("测试output", () => {
        alfred.output({
            items: [{
                title: 'test'
            }]
        }, ['title']);
    });
});