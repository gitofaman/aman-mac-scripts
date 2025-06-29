window.addEventListener("DOMContentLoaded", () => {
    const imgSrc = $('.work-items-for-hero .full-image').first().attr('src');
    if (!imgSrc) {
        console.error("No image found in .work-items-for-hero .full-image");
        return;
    }

    const canvas = document.getElementById("renderCanvas");
    if (!canvas) return;

    const engine = new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
    }, true);
    if (!engine) return;

    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    const camera = new BABYLON.FreeCamera("orthoCamera", new BABYLON.Vector3(0, 0, -10), scene);
    camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.position = new BABYLON.Vector3(0, 0, -10);
    camera.setTarget(BABYLON.Vector3.Zero());

    const material = new BABYLON.StandardMaterial("planeMat", scene);
    material.diffuseTexture = new BABYLON.Texture(imgSrc, scene);
    material.alpha = 1; // fully visible
    material.backFaceCulling = false;

    const plane = BABYLON.MeshBuilder.CreatePlane("fullscreenPlane", {
        size: 1
    }, scene);
    plane.material = material;
    plane.position.z = 0;
    plane.scaling.x = 2;
    plane.scaling.y = 2;

    const rescale = () => {
        const aspect = engine.getRenderWidth() / engine.getRenderHeight();
        camera.orthoTop = 1;
        camera.orthoBottom = -1;
        camera.orthoLeft = -aspect;
        camera.orthoRight = aspect;
    };
    rescale();

    // fisheye shader:
    BABYLON.Effect.ShadersStore.fisheyeFragmentShader = `
        precision highp float;
        varying vec2 vUV;
        uniform sampler2D textureSampler;
        uniform vec2 u_resolution;
        uniform float u_distortion;

        void main() {
            vec2 uv = vUV - vec2(0.5);
            float dist = length(uv);
            float distortionFactor = 1.0 + u_distortion * pow(dist, 1.5);
            vec2 distortedUV = uv / distortionFactor + vec2(0.5);

            if (distortedUV.x < 0.0 || distortedUV.x > 1.0 || distortedUV.y < 0.0 || distortedUV.y > 1.0) {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            } else {
                gl_FragColor = texture2D(textureSampler, distortedUV);
            }
        }
    `;

    const distortionState = {
        value: 0
    };
    const maxDistortion = 1.2;

    const postProcess = new BABYLON.PostProcess(
        "fisheye",
        "fisheye",
        ["u_resolution", "u_distortion"],
        null,
        1,
        camera,
        BABYLON.Texture.BILINEAR_SAMPLINGMODE,
        engine,
        true
    );

    postProcess.onApply = effect => {
        effect.setFloat2("u_resolution", engine.getRenderWidth(), engine.getRenderHeight());
        effect.setFloat("u_distortion", distortionState.value);
    };

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    window.addEventListener("scroll", () => {
        const now = performance.now();
        const currentScrollY = window.scrollY;
        const deltaY = currentScrollY - lastScrollY;
        const deltaTime = now - lastTime;

        const velocity = deltaY / deltaTime; // pixels per millisecond
        const amount = Math.min(Math.abs(velocity) * 5, maxDistortion);

        gsap.to(distortionState, {
            value: amount,
            duration: 0.4,
            ease: "power1.out"
        });

        lastScrollY = currentScrollY;
        lastTime = now;
    });

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener("resize", () => {
        engine.resize();
        rescale();
    });
});