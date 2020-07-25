(async function () {
    const speedRates = [2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4];

    let settingsBtn = '.ytp-button.ytp-settings-button', // Gear icon
        speedOption = '.ytp-popup.ytp-settings-menu > .ytp-panel > .ytp-panel-menu > .ytp-menuitem:contains("Playback speed")', // Playback speed label
        speedRatesMenu = '.ytp-popup.ytp-settings-menu > .ytp-panel > .ytp-panel-menu'; // Rectangle with speed rate options

    // Waiting for YouTube player to render settings button
    while (!$(settingsBtn).length)
        await new Promise(res => setTimeout(res, 500));

    // YouTube creates the menu dynamically when the user clicks on the Settings icon. Setting EL for that.
    $(settingsBtn).on('click', function () {
        $(speedOption).on('click', async function () {
            settingsBtn = $(settingsBtn);
            speedOption = $(speedOption);
            speedRatesMenu = $(speedRatesMenu);

            // Waiting for menu animation to finish
            await new Promise(res => setTimeout(res, 1000));

            speedRates.forEach(speedRate => {
                // If that speed label was already added, return.
                // YT "randomly" seems to remove the speed labels and rebuild. So, I cannot just remove the click EL;
                // I have to rebuild all new labels everytime.
                if ($(`.ytp-menuitem:contains('${speedRate}')`, speedRatesMenu).length) return;

                // Creating speed labels
                const speedBtn = document.createElement('div');
                speedBtn.classList.add('ytp-menuitem');
                speedBtn.setAttribute('tabindex', 0);
                speedBtn.setAttribute('role', 'menuitemradio');
                speedBtn.innerHTML = `<div class='ytp-menuitem-label'>${speedRate}</div>`;
                speedBtn.onclick = function () {
                    // Removing current selected element, selecting a new one, increasing video speed & changing speed label indicator
                    $(".ytp-menuitem[aria-checked='true']", speedRatesMenu).removeAttr('aria-checked');
                    $(this).attr('aria-checked', 'true');
                    $('video')[0].playbackRate = speedRate;
                    $('.ytp-button.ytp-panel-title').click();
                    $('.ytp-menuitem-content', speedOption).html(speedRate);
                };

                // Appending to menu
                $(speedRatesMenu).last().append(speedBtn);
            });
        });

        $(this).off('click');
    });

})();
