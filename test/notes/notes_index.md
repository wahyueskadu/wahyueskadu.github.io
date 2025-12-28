---
layout: default
title: Index of Notes
---

## My Notes Collection

<ul>
  {% for note in site.pages %}
    
    {% if note.path contains 'notes/' and note.title %}
      <li>
        <a href="{{ site.baseurl }}{{ note.url }}">
          {{ note.title }}
        </a>
        <br>
        <small><i>Last modified: {{ note.last_modified_at | date: "%B %d, %Y" }}</i></small>
      </li>
    {% endif %}

  {% endfor %}
</ul>
