# Simulated annealing

## Application

1. Find an approximation of a global minimum for a function with a large number of variables

    ![T-minimize](https://upload.wikimedia.org/wikipedia/commons/d/d5/Hill_Climbing_with_Simulated_Annealing.gif)

2. Simulated Annealing can be used to solve combinatorial problems. Here it is applied to the travelling salesman problem to minimize the length of a route that connects all 125 points.

    ![TSP-solved-by-simulated-annealing](https://upload.wikimedia.org/wikipedia/commons/1/10/Travelling_salesman_problem_solved_with_simulated_annealing.gif)

## Steps - Iteration

At each step, the algorithm randomly selects a solution close to the current one, measures its quality, and then decides to move to it or to stay with the current solution based on either **one or two probabilities** between which it chooses on the basis of the fact that the new solution is better or worse than the current one.

At each step, the **probability of moving** to a better new solution is either kept to 1 or is changed towards a positive value; instead, the probability of moving to a worse new solution is progressively changed towards zero.

End at: until the system reaches a state that is good enough for the application, or until a given computation budget has been exhausted.

## Algorithm

```txt
Let s = s_0
For k = 0 through k_max(exclusive):
    T = temperature(k/k_max)
    Pick a random neighbor, s_new = neighbor(s)
    If P(E(s), E(s_new), T) >= random(0, 1)
        s = s_new
Output the final state s
```

> With temperature down, the energy get minimized.

- The energy function E(): our goal is minimizing the energy
- The candidate generator procedure neighbor(): new states produced through conservatively altering a given state.

    For TSP, states: a permutation of the cities to be visited, neighbors of a state: the set of permutations produced by **reversing the order of any two successive cities**(a move).

    vs hill climbing: latter may outcome just a local optimum, solution: also accept worse(not only better) neighbors in order to avoid getting stuck in local optima; can find the global optimum if run for a long enough amount time.

- The acceptance probability function P(e, e', T): T is a global time-varying parameter called temperature. States with a small energy are better than those with a greater energy. The probability function P must be positive even when e' is greater than e. **This feature prevents the method from becoming stuck at a local minimum that is worse than the global**

    When T tends to zero, the probability P(e, e', T) must tend to zero if e' > e and to a positive value otherwise.

    For sufficiently small values of T, the system will then increasingly favor moves that go "downhill"(i.e. to lower energy values), and avoid those that go "uphill". With T = 0, the procedure reduces to the greedy algorithm, which makes only the downhill transitions. With T = 0, the procedure reduces to the greedy algorithm, which makes only the downhill transitions.

    $$
    P(e, e', T) = \begin{cases}
        1, e' < e\\
        \text{decrease function of (e' - e)}, e' > e, \\
        \to 0, e' > e, T \to 0
    \end{cases}
    $$

    > sometimes things really do have to get worse before they can get better.

- The annealing schedule temperature(): During the search, the temperature is progressively decreased from an initial positive value to zero and affects the two probabilities.

    The temperature T plays a crucial role in controlling the evolution of the state s of the system with regard to its sensitivity to the variations of system energies. To be precise, for a large T, the evolution of s is sensitive to coarser(粗糙) energy variations, while it is sensitive to finer(精细) energy variations when T is small.

    > T decreased at each step follows some annealing schedule, must be end with T = 0 towards a broad region of the search space containing good solutions

- The initial temperature <init temp>

These choices can have significant impact on the method's effectiveness. But there are no choice of these parameters that will be good for all problems, and there is no general way to find the best choices for a given problem.

Random walk on a search graph, whose vertices are all possible states, and whose edges are the candidate moves.

## Lemmas

1. For any given finite problem, the probability that the simulated annealing algorithm terminates with a global optimal solution approaches 1 as the annealing schedule is extended.

## Code



## Useful links

1. https://en.wikipedia.org/wiki/Simulated_annealing
2. https://zh.wikipedia.org/wiki/%E6%A8%A1%E6%8B%9F%E9%80%80%E7%81%AB
3. http://toddwschneider.com/posts/traveling-salesman-with-simulated-annealing-r-and-shiny/
4. https://www.mathworks.com/help/gads/how-simulated-annealing-works.html