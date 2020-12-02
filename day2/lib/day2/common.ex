defmodule Day2.Common do

  def load_file(file) do
    File.read!(file)
    |> String.split("\n")
  end

  def parse_lines(lines) do
    lines
    |> Enum.map(&parse_line/1)
    |> Enum.filter(& !is_nil(&1))
  end

  def find_valid_passwords(passwords, func) do
    passwords
    |> Enum.filter(func)
  end

  def report!(passwords) do
    passwords
    |> Enum.count()
    |> IO.inspect
  end

  defp parse_line(""), do: nil

  defp parse_line(line) do
    [count, letter_with_colon, pw] = String.split(line)
    letter = String.at(letter_with_colon, 0)
    [min, max] = String.split(count, "-") |> Enum.map(&String.to_integer/1)
    %{
      min: min,
      max: max,
      letter: letter,
      pw: pw
    }
  end

end
