defmodule Day2.Part1 do
  alias Day2.Common
  def run(file) do
    file
    |> Common.load_file
    |> Common.parse_lines
    |> Common.find_valid_passwords(&valid?/1)
    |> Common.report!
  end

  defp valid?(%{min: min, max: max, letter: letter, pw: pw}) do
    freq = pw
      |> String.graphemes
      |> Enum.frequencies

    count = freq[letter]
    ltm = (count <= max)
    gtm = (count >= min)

    ltm && gtm
  end
end
