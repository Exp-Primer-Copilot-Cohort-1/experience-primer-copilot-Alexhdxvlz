function skillsMembers() {
    var members = document.getElementsByClassName("member");
    for (var i = 0; i < members.length; i++) {
        var member = members[i];
        var skills = member.getElementsByClassName("skills")[0];
        var skillsList = skills.getElementsByClassName("skill");
        var skillsArray = [];
        for (var j = 0; j < skillsList.length; j++) {
            var skill = skillsList[j];
            skillsArray.push(skill.innerHTML);
        }
        member.setAttribute("data-skills", skillsArray.join(","));
    }
}