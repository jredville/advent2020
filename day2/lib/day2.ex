defmodule Day2 do
  @moduledoc """
  Documentation for `Day2`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Day2.hello()
      :world

  """
  def main(args \\ []) do
    parsed = args
    |> parse_args

    if Keyword.get(parsed, :part1) do
      parsed
      |> Keyword.get(:file)
      |> Day2.Part1.run
    else
      parsed
      |> Keyword.get(:file)
      |> Day2.Part2.run
    end
  end

  def parse_args(args) do
    {opts, _, _} =
      args
      |> OptionParser.parse(switches: [file: :string, part1: :boolean])

    opts
  end

end
