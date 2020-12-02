defmodule Day2.Part2 do
  alias Day2.Common
  def run(file) do
    file
    |> Common.load_file
    |> Common.parse_lines
    |> Common.find_valid_passwords(&valid?/1)
    |> Common.report!
  end

  defp valid?(%{min: pos1, max: pos2, letter: letter, pw: pw}) do
    charAt1 = String.at(pw, pos1-1)
    charAt2 = String.at(pw, pos2-1)

    case {charAt1, charAt2} do
      {^letter, ^letter} -> false
      {^letter, _other} -> true
      {_other, ^letter} -> true
      {_, _} -> false
    end
  end
end
