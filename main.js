document.addEventListener("DOMContentLoaded", () => {
    const monolithicGrid = document.getElementById("monolithicGrid");
    const siteSearch = document.getElementById("siteSearch");
    const drawerShroud = document.getElementById("drawerShroud");
    const collectibleSlab = document.getElementById("collectibleSlab");
    const specNum = document.getElementById("specNum");
    const slabIndex = document.getElementById("slabIndex");
    const supporterUsername = document.getElementById("supporterUsername");
    const supporterRole = document.getElementById("supporterRole");
    const pullString = document.getElementById("pullString");

    const emotionalDedication = document.getElementById("emotionalDedication");
    const monumentalTitle = document.getElementById("monumentalTitle");
    const scrollLabel = document.getElementById("scrollLabel");

    let usernameResizeObserver = null;

    function fitSupporterUsername() {
        if (!supporterUsername) return;

        const container = supporterUsername.parentElement;
        if (!container) return;

        const text = (supporterUsername.textContent || "").trim();
        const containerWidth = Math.max(24, container.clientWidth - 28);
        const containerHeight = Math.max(20, container.clientHeight - 28);
        const baseFontSize = parseFloat(getComputedStyle(supporterUsername).fontSize) || 56;
        const minFontSize = 10;

        const estimatedChars = Math.max(8, text.replace(/[^A-Za-z0-9]/g, "").length);
        let fontSize = Math.min(baseFontSize, Math.max(minFontSize, containerWidth / Math.max(1, estimatedChars * 0.62)));

        supporterUsername.style.display = "inline-block";
        supporterUsername.style.width = "auto";
        supporterUsername.style.maxWidth = "100%";
        supporterUsername.style.setProperty("font-size", `${fontSize}px`, "important");
        supporterUsername.style.whiteSpace = "nowrap";
        supporterUsername.style.overflow = "visible";
        supporterUsername.style.transform = "none";

        while (fontSize >= minFontSize) {
            supporterUsername.style.setProperty("font-size", `${fontSize}px`, "important");
            const widthOk = supporterUsername.scrollWidth <= containerWidth + 4;
            const heightOk = supporterUsername.scrollHeight <= containerHeight + 4;

            if (widthOk && heightOk) {
                break;
            }

            fontSize -= 0.5;
        }

        supporterUsername.style.setProperty("font-size", `${Math.max(minFontSize, fontSize)}px`, "important");
    }

    function observeSupporterUsername() {
        if (!supporterUsername || !collectibleSlab) return;

        if (usernameResizeObserver) {
            usernameResizeObserver.disconnect();
        }

        usernameResizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(fitSupporterUsername);
        });

        usernameResizeObserver.observe(collectibleSlab);
        usernameResizeObserver.observe(supporterUsername.parentElement);
        window.addEventListener("resize", () => requestAnimationFrame(fitSupporterUsername));
    }

    // ==========================================
    // 1. INTRO TRANSITION CONTROLLER
    // ==========================================
    function triggerTitleTransition() {
        if (emotionalDedication && !emotionalDedication.classList.contains("fade-out")) {
            emotionalDedication.classList.add("fade-out");
            
            setTimeout(() => {
                monumentalTitle.classList.remove("hidden");
                
                setTimeout(() => {
                    scrollLabel.classList.add("visible");
                }, 300);
            }, 500);
        }
    }

    // Timer fallback: auto transitions after 2.2 seconds
    const autoTransitionTimer = setTimeout(triggerTitleTransition, 2200);

    // Scroll listener: transitions instantly if they scroll down early
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            clearTimeout(autoTransitionTimer);
            triggerTitleTransition();
        }
    }, { once: true });

    // ==========================================
    // 2. SYNTHESIZED TACTILE AUDIO EFFECTS
    // ==========================================
    function playConcreteThud() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.frequency.setValueAtTime(120, ctx.currentTime); // Low physical pitch
            osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.4);
        } catch (e) {
            console.log("Web Audio Context blocked/unsupported.");
        }
    }

    // ==========================================
    // 3. FOLLOWER ARRAY & RENDERING
    // ==========================================
    const followers = [
        "maison.semoire.jewellery", "pineapple_land7777", "burgerempire", "ejcleaners.dmv",
        "muslimsisterscorner", "adebat594", "_promocao_disponivel", "keepin.it.23",
        "mydeefabricsng", "living.by.gwen", "chesh_time", "nailsbylizethv",
        "southside.sweetz", "deli_cami06", "bentobaked", "motouch.at_handmade_gifts",
        "lisasoleilmis", "rebelsidea2", "sozpizza", "biteemebakery", "kiaras.care",
        "beautybyjolenecork", "round2_mobilebar", "lunchanyone", "blockwisefinance",
        "onelovepetsalon", "sarita_sweetss_", "cannoli_cravings", "flowers_kitty209",
        "styl_edbysha", "mohdfiroz5969", "thebayroom_maltese", "gina72685",
        "eugenessweets", "wholesomelivingg", "vinodkumar7996", "its.realnaomi",
        "annes_custom_cookies", "massagebybrendathe1", "crystallized.beauty.tx",
        "aigd.products", "come_calla__flavandsoulkitchen", "dlash.lab", "form.ceo",
        "robertoch_7", "butter_and_memory", "miraclelakefurniturestore", "goldenhourbelleville",
        "peyyxessentials", "tinyflipdelights", "comiduquens", "zamal__143",
        "yukii_nails_", "crafts_byamber_llc", "flowersby_patima", "nails.bymadisson",
        "memo_contreras_locutor", "valleydirtysodaco.1", "fakharul234", "joesdineraz",
        "paintplaysmile", "n007handmade", "b.e.e.cafe", "dough_and_kneading",
        "fresasbykay_", "yummycookiesfromsophia", "snarkiesparkles", "myrasmiches",
        "drizzledesserts.official", "tinksprettybeads", "dulce_delightss", "oxrated",
        "heavenlyy.goods", "cakepopsociety", "dipped.obsessed", "jaggerandmae",
        "dirtysips.co", "thedrinkspot209", "lemoliciousslc", "huellitascafeandmatcha",
        "trulytaurus3", "ks_kreationzz", "dippedwithloveee_", "juicy__vida",
        "dandeliondipco", "mnl.backdrop.rentals.llc", "talkdatyaz", "a_r.exoticstacks",
        "nofacegsocaptured", "matchaconmidy", "48tropicall", "thejoshuamorehead",
        "itssbrookkk", "thekeeingredients_", "hair_envyqueen_", "snugabugaboo",
        "brookscreations", "nayescreations_", "clarkbrandstudios", "lilbaddieee.d"
    ];

    followers.reverse();

    function renderFoundation() {
        monolithicGrid.innerHTML = "";
        
        followers.forEach((handle, index) => {
            const indexNum = index + 1;
            const formattedNum = String(indexNum).padStart(3, '0');

            let roleTitle = "FOUNDATIONAL PIECE";
            if (indexNum <= 10) {
                roleTitle = "ORIGINAL GROUNDBREAKER";
            } else if (indexNum === 100) {
                roleTitle = "KEYSTONE MEMBER";
            }

            const block = document.createElement("div");
            block.className = "foundation-block";
            block.id = `block-${formattedNum}`;
            block.setAttribute("data-handle", handle.toLowerCase());
            block.setAttribute("data-role", roleTitle);
            
            // Random rot offsets for tactile realism
            const randomRotation = (Math.random() * 3 - 1.5).toFixed(2);
            block.style.transform = `rotate(${randomRotation}deg)`;

            block.onclick = (e) => pullAndUnfoldBlock(e, formattedNum, handle, roleTitle);
            
            block.innerHTML = `
                <div class="block-meta">#${formattedNum}</div>
                <div class="block-name">@${handle}</div>
            `;
            
            monolithicGrid.appendChild(block);
        });
    }

    // ==========================================
    // 4. INTERACTIVE IMPACT & CELEBRATION
    // ==========================================
    function pullAndUnfoldBlock(event, number, handle, role) {
        const clickedBlock = document.getElementById(`block-${number}`);
        const allBlocks = document.querySelectorAll(".foundation-block");
        const rect = clickedBlock.getBoundingClientRect();

        // Explosion 1: Blast off the clicked grid coordinate instantly
        const xPercent = (rect.left + rect.width / 2) / window.innerWidth;
        const yPercent = (rect.top + rect.height / 2) / window.innerHeight;

        if (typeof confetti === "function") {
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { x: xPercent, y: yPercent },
                colors: ['#ff5500', '#f2f4f7', '#2a3644'], // Orange, Chalk, Slate
                scalar: 1.2
            });
        }

        allBlocks.forEach(block => {
            if (block !== clickedBlock) {
                block.classList.add("vaporized");
            }
        });

        clickedBlock.classList.add("active-focus");

        // Set pull string to center of brick
        const startY = rect.top + (rect.height / 2) + window.scrollY;
        pullString.style.top = `${startY}px`;

        // Unfold cabinet
        setTimeout(() => {
            specNum.innerText = `FOUNDING MEMBER #${number}`;
            slabIndex.innerText = `#${number}`;
            supporterUsername.innerText = `@${handle.toUpperCase()}`;
            supporterRole.innerText = role;
            requestAnimationFrame(fitSupporterUsername);
            
            drawerShroud.classList.add("active");
            document.body.style.overflow = "hidden";
            requestAnimationFrame(() => {
                requestAnimationFrame(fitSupporterUsername);
            });

            playConcreteThud();

            drawerShroud.classList.add("apply-impact-shake");
            collectibleSlab.classList.add("apply-card-thud");

            // Explosion 2: Double party cannon shower from the cabinet sides
            setTimeout(() => {
                if (typeof confetti === "function") {
                    confetti({
                        particleCount: 50,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: ['#ff5500', '#f2f4f7']
                    });
                    confetti({
                        particleCount: 50,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: ['#ff5500', '#f2f4f7']
                    });
                }
            }, 750);

        }, 450);
    }

    window.resetLot = () => {
        drawerShroud.classList.remove("active");
        drawerShroud.classList.remove("apply-impact-shake");
        collectibleSlab.classList.remove("apply-card-thud");
        document.body.style.overflow = "auto";

        setTimeout(() => {
            const allBlocks = document.querySelectorAll(".foundation-block");
            allBlocks.forEach(block => {
                block.classList.remove("vaporized");
                block.classList.remove("active-focus");
            });
        }, 400);
    };

    // Real-time grid search filtering
    siteSearch.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const blocks = document.querySelectorAll(".foundation-block");
        
        blocks.forEach(block => {
            const handle = block.getAttribute("data-handle");
            if (handle.includes(query)) {
                block.style.display = "flex";
            } else {
                block.style.display = "none";
            }
        });
    });

    observeSupporterUsername();
    requestAnimationFrame(fitSupporterUsername);
    renderFoundation();
});
