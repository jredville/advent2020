import sys
import math
import argparse


# BFFFBBFRRR: row 70, column 7, seat ID 567.
# FFFBBBFRRR: row 14, column 7, seat ID 119.
# BBFFBBFRLL: row 102, column 4, seat ID 820.
class Seat:
    def __init__(self, data):
        self.data = data
        self.row_data = data[:7]
        self.col_data = data[7:]

    def row(self):
        return self.__calc(0, 127, 'F', self.row_data)

    def col(self):
        return self.__calc(0, 7, 'L', self.col_data)

    def seat_id(self):
        return self.row() * 8 + self.col()

    def __calc(self, l, r, low, data):
        for char in data:
            step = (r - l) / 2
            if char == low:
                r = math.floor(r - step)
            else:
                l = math.ceil(l + step)

        return l


def main(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--part2", help="Run part2",
                        action="store_true")
    parser.add_argument("file", help="file to load")
    args = parser.parse_args()

    lines = load(args.file)

    if args.part2:
        return part2(lines)
    else:
        return part1(lines)


def part1(lines):
    seats = [Seat(line).seat_id() for line in lines]
    seats.sort()
    return seats[-1]


def part2(lines):
    seats = [Seat(line).seat_id() for line in lines]
    seats.sort()
    for i, seat in enumerate(seats):
        if seat + 2 == seats[i+1]:
            return seat + 1


def load(file):
    with open(file) as f:
        return f.read().splitlines()


if __name__ == "__main__":
    lines = main(sys.argv[1:])
    print(lines)
