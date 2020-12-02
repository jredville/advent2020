lines = File.read(ARGV[0]).split.compact.map(&:to_i).sort

left = 1
right = lines.length - 1
target = 2020

def check(list, b, l, r)
    value = list[b] + list[l] + list[r]
    puts "#{value}, #{list[b]}, #{list[l]}, #{list[r]}\n---"
    value
end

0.upto(lines.length - 1) do |base|
    next if base == left || base == right
    while (value = check(lines, base, left, right)) != target && left < right
        if value < target
            left += 1
        elsif value > target
            right -= 1
        end
    end

    if check(lines, base, left, right) == target
        puts lines[base]
        puts lines[left]
        puts lines[right]
        puts lines[base] * lines[left] * lines[right]
        exit
    else
        left = 0
        right = lines.length - 1
    end
end
