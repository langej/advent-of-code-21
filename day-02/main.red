Red [ title: "aoc day-02" ]

submarine: make object! [
    horizontal: 0
    depth:      0
    forward:    function [x [integer!]] [ set 'horizontal horizontal + x ]
    down:       function [x [integer!]] [ set 'depth      depth      + x ]
    up:         function [x [integer!]] [ set 'depth      depth      - x ]
    position?:  function [] [ horizontal * depth ]
]
corrected-submarine: make submarine [
    aim:     0
    forward: function [x [integer!]] [ 
        set 'horizontal horizontal + x
        set 'depth depth + (aim * x)
    ]
    down: function [x [integer!]] [ set 'aim aim + x ]
    up:   function [x [integer!]] [ set 'aim aim - x ]
]

file: read %input.txt
lines: split file newline
foreach line lines [
    parts: split line space
    x: to-integer parts/2
    switch parts/1 [
        "forward"   [submarine/forward  x   corrected-submarine/forward  x]
        "down"      [submarine/down     x   corrected-submarine/down     x]
        "up"        [submarine/up       x   corrected-submarine/up       x]
    ]
]
print ["puzzle #1:" submarine/position?]
print ["puzzle #2:" corrected-submarine/position?]
