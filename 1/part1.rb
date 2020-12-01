lines = File.read(ARGV[0]).split.compact.map(&:to_i).sort

left = 0
right = lines.length - 1
target = 2020

def check(list, l, r)
    value = list[l] + list[r]
    puts "#{value}, #{list[l]}, #{list[r]}\n---"
    value
end

while (value = check(lines, left, right)) != target
    if value < target
        left += 1
    elsif value > target
        right -= 1
    end

    if left > right
        puts 'something went wrong'
        exit(1)
    end
end

puts lines[left]
puts lines[right]
puts lines[left] * lines[right]