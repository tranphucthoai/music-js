function init() {
    slider();
    mucsic();

}
init();

function slider() {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    sliderInit(rangeInputs);
    rangeInputs.forEach(input => {
        input.addEventListener('input', handleInputChange)
    })

}

function handleInputChange(e) {
    let target;
    if (e.target) {
        target = e.target
        if (e.target.type !== 'range') {
            target = document.getElementById('range')
        }
    } else {
        target = e;
    }

    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'

}

function sliderInit(rangeInputs) {
    rangeInputs.forEach(function(ele) {
        if (ele.value == 0) {
            ele.style.backgroundSize = '0% 100%'
        }
    });
}

function mucsic() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const cdImg = $(".cd .cd__thumb img");
    const cd = $(".cd");
    const info = $(".info");
    const audio = $("#audio");
    const player = $(".player");
    const playList = $(".play-list");
    const playBtn = $(".circle");
    const progress = $("#progress");
    const nextBtn = $(".btn-next");
    const prevBtn = $(".btn-prev");
    const repeatBtn = $(".btn-repeat");
    const randomBtn = $(".btn-random");
    let songList;

    const app = {
        currentIndex: 0,
        isPlaying: false,
        isRandom: false,
        isLoop: false,
        songs: [{
                name: "Ngân Lang Remix",
                author: "Jombie x Duy Khiêm",
                path: "./images/Ngân Lang.mp3",
                img: "./images/giphy.gif"
            },
            {
                name: "Bỏ Em Vào Ba Lô Remix",
                author: "Tân Trần x Freak D",
                path: "./images/Bỏ Em Vào Ba Lô.mp3",
                img: "./images/thumb-bo-em-vao-ba-lo.jpg"
            },
            {
                name: "Cô Đơn Giành Cho Ai Remix",
                author: "Lee Ken x Nal",
                path: "./images/Cô Đơn Giành Cho Ai.mp3",
                img: "./images/thumb-co-don-gianh-cho-ai.jpg"
            },
            {
                name: "Rồi Tới Luôn Remix",
                author: "Nal",
                path: "./images/Rồi Tới Luôn.mp3",
                img: "./images/thumb-roi-toi-luon.jpg"
            }, {
                name: "Ngân Lang Remix",
                author: "Jombie x Duy Khiêm",
                path: "./images/Ngân Lang.mp3",
                img: "./images/giphy.gif"
            },
            {
                name: "Bỏ Em Vào Ba Lô Remix",
                author: "Tân Trần x Freak D",
                path: "./images/Bỏ Em Vào Ba Lô.mp3",
                img: "./images/thumb-bo-em-vao-ba-lo.jpg"
            },
            {
                name: "Cô Đơn Giành Cho Ai Remix",
                author: "Lee Ken x Nal",
                path: "./images/Cô Đơn Giành Cho Ai.mp3",
                img: "./images/thumb-co-don-gianh-cho-ai.jpg"
            },
            {
                name: "Rồi Tới Luôn Remix",
                author: "Nal",
                path: "./images/Rồi Tới Luôn.mp3",
                img: "./images/thumb-roi-toi-luon.jpg"
            }, {
                name: "Ngân Lang Remix",
                author: "Jombie x Duy Khiêm",
                path: "./images/Ngân Lang.mp3",
                img: "./images/giphy.gif"
            },
            {
                name: "Bỏ Em Vào Ba Lô Remix",
                author: "Tân Trần x Freak D",
                path: "./images/Bỏ Em Vào Ba Lô.mp3",
                img: "./images/thumb-bo-em-vao-ba-lo.jpg"
            },
            {
                name: "Cô Đơn Giành Cho Ai Remix",
                author: "Lee Ken x Nal",
                path: "./images/Cô Đơn Giành Cho Ai.mp3",
                img: "./images/thumb-co-don-gianh-cho-ai.jpg"
            },
            {
                name: "Rồi Tới Luôn Remix",
                author: "Nal",
                path: "./images/Rồi Tới Luôn.mp3",
                img: "./images/thumb-roi-toi-luon.jpg"
            }
        ],
        defineProperties: function() {
            Object.defineProperty(this, "currentSong", {
                get: function() {
                    return this.songs[this.currentIndex];
                }
            });
        },
        renderSongs: function() {
            let htmls = this.songs.map((ele, index) => {
                return `
                <li class="song-item">
                    <div class="song ${index === this.currentIndex ? "is-active" : ""} " data-id="${index}">
                        <div class="song__thumb">
                            <img src="${ele.img}" alt="">
                        </div>
                        <div class="song__text">
                            <h4 class="song__name">
                            ${ele.name}
                            </h4>
                            <div class="song__author">
                            ${ele.author}
                            </div>
                        </div>
                        <div class="song__more">
                            <i class="fa fa-ellipsis-h"></i>
                        </div>
                    </div>
                </li>
                
                `;
            })

            $(".songs-list").innerHTML = htmls.join("");

        },
        handleEvent: function() {
            const cdWidth = cd.offsetWidth;
            let _this = this;
            // scale thumb scroll
            player.onscroll = function() {
                let scrollTop = player.scrollTop;
                cd.style.width = Math.round(cdWidth - scrollTop) >= 0 ? Math.round(cdWidth - scrollTop) + "px" : 0;
                cd.style.opacity = Math.round(cdWidth - scrollTop) / cdWidth;
            }

            // play
            playBtn.onclick = function() {
                if (_this.isPlaying) {
                    audio.pause();

                } else {
                    audio.play();

                }
            }
            audio.onplay = function() {
                _this.isPlaying = true;
                playBtn.classList.add("playing");
                cdAnimation.play();
            }
            audio.onpause = function() {
                _this.isPlaying = false;
                playBtn.classList.remove("playing");
                cdAnimation.pause();
            }

            // update progress
            audio.ontimeupdate = function() {
                if (audio.duration) {
                    const progressPrecent = audio.currentTime / audio.duration * 100;
                    progress.value = progressPrecent;
                    handleInputChange(progress);
                }
            }

            // update progress
            progress.onchange = function(e) {
                let seekProgress = audio.duration / 100 * e.target.value;
                audio.currentTime = seekProgress;
            }

            // cd rotate

            const cdAnimation = cd.animate({
                "transform": "rotate(360deg)"
            }, {
                duration: 10000,
                iterations: Infinity
            })
            cdAnimation.pause();

            // next
            nextBtn.onclick = function() {
                _this.isRandom ? _this.randomSong() : _this.nextSong();
                _this.loadCurrentSong();
                audio.play();
                _this.renderSongs();

            }
            prevBtn.onclick = function() {
                _this.isRandom ? _this.randomSong() : _this.prevSong();
                _this.loadCurrentSong();
                audio.play();
                _this.renderSongs();

            }

            // random
            randomBtn.onclick = function(e) {
                !_this.isRandom ? randomBtn.classList.add("is-active") : randomBtn.classList.remove("is-active");
                _this.isRandom = !_this.isRandom;
                _this.randomSong();
            }
            repeatBtn.onclick = function(e) {
                !_this.isLoop ? repeatBtn.classList.add("is-active") : repeatBtn.classList.remove("is-active");
                _this.isLoop = !_this.isLoop;
            }

            // onended
            audio.onended = function(e) {
                nextBtn.click();
            }

            //song click
            songList = $$(".song");
            // songList.forEach(function(ele) {
            //     ele.onclick = function(e) {
            //         console.log(ele)
            //         let songNode = e.target.closest(".song");
            //         if (!songNode.classList.contains("is-active")) {
            //             _this.currentIndex = songNode.dataset.id;
            //             _this.loadCurrentSong();
            //             _this.renderSongs();
            //         }
            //     }
            // })
            songList.forEach(function(ele) {
                console.log(ele);
                ele.onclick = function(e) {
                    let songNode = e.target.closest(".song");
                    console.log(ele);
                    if (!songNode.classList.contains("is-active")) {
                        _this.currentIndex = Number(songNode.dataset.id);
                        _this.loadCurrentSong();
                        _this.renderSongs();
                    }
                }
            })
        },
        loadCurrentSong: function() {
            cdImg.src = this.currentSong.img;
            audio.src = this.currentSong.path;

            info.innerHTML = `
            <span class="info__sub-title">Now Playing</span>
            <h3 class="info__title">
                ${
                    this.currentSong.name
                }
            </h3>
            `;
        },
        nextSong: function() {
            this.currentIndex++;
            if (this.currentIndex > this.songs.length - 1 && this.isLoop) {
                this.currentIndex = 0;
            } else if (this.currentIndex > this.songs.length - 1 && !this.isLoop) {
                this.currentIndex = this.songs.length - 1;
            }
        },
        prevSong: function() {
            this.currentIndex--;
            if (this.currentIndex < 0 && this.isLoop) {
                this.currentIndex = this.songs.length - 1;
            } else if (this.currentIndex < 0 && !this.isLoop) {
                this.currentIndex = 0;
            }
        },
        randomSong: function() {
            let songRandom;
            do {
                songRandom = (Math.floor(Math.random() * this.songs.length));
                console.log(songRandom);
            } while (songRandom === this.currentIndex);

            this.currentIndex = songRandom;

        },
        repeatSong: function() {
            isLoop = !isLoop;
        },
        start: function() {
            this.defineProperties();
            this.renderSongs();
            this.handleEvent();
            this.loadCurrentSong();
        }
    }
    app.start();
}