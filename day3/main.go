package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"strings"
)

func pathThrough(r, d int, lines []string) int {
	at := 0
	count := 0
	for i := 0; i < len(lines); i += d {
		line := lines[i]
		if len(line) == 0 {
			continue
		}
		if line[at % len(line)] ==  byte('#') {
			count++
		}
		at += r
	}

	return count
}

func main() {
	file := flag.String("file", "input.test", "file")
	part2 := flag.Bool("part2", false, "part2")
	flag.Parse()
	data, err := ioutil.ReadFile(*file)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(data), "\n")
    var collisions int
	if !*part2 {
		collisions = pathThrough(3, 1, lines)
	} else {
		collisions = 1
		for _, vals := range [][]int{
			[]int{1,1},
			[]int{3,1},
			[]int{5,1},
			[]int{7,1},
			[]int{1,2},
		} {
			collisions = collisions * pathThrough(vals[0], vals[1], lines)
		}
	}
	fmt.Printf("%v", collisions)
}
