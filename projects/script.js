$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }
    });
});

// Tab visibility change
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio Akash Kant";
        $("#favicon").attr("href", "/assets/images/favicon.gif");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "/assets/images/favhand.png");
    }
});

function getProjects() {
    return fetch("projects.json")
        .then(response => response.json());
}

function showProjects(projects) {
    let projectsContainer = document.querySelector(".box-container");
    let html = "";

    projects.forEach(project => {
        const category = project.category.toLowerCase();
        html += `
      <div class="grid-item ${category}">
        <div class="box tilt" style="width: 380px; margin: 1rem;">
          <img src="/assets/images/projects/${project.image}.png" alt="${project.name}" />
          <div class="content">
            <div class="tag">
              <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${project.desc}</p>
              <div class="btns">
                ${project.links.view ? `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>` : ""}
                ${project.links.code ? `<a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    });

    projectsContainer.innerHTML = html;

    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
        speed: 400
    });

    // Wait for images then init isotope
    var $grid = $('.box-container');
    $grid.imagesLoaded(function () {
        $grid.isotope({
            itemSelector: '.grid-item',
            layoutMode: 'fitRows'
        });
    });

    $('.button-group').on('click', 'button', function () {
        $('.button-group .btn').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

getProjects().then(showProjects);

// Prevent dev tools (optional)
document.onkeydown = function (e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
};
