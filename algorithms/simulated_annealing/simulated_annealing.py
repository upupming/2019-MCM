import numpy

def read_distance():
    num_of_nodes = 0
    distances_str = []
    with open('./att/att48_d.txt') as distance_file:
        lines = distance_file.readlines()
        num_of_nodes = len(lines)
        distances_str = ' '.join(lines)
        # print(distances_str)
    distances = numpy.fromstring(distances_str, dtype=int, sep=' ')
    distances = distances.reshape((num_of_nodes, num_of_nodes))
    # print(distances)
    return distances

def read_solution():
    route = []
    with open('./att/att48_s.txt') as solution_file:
        lines = solution_file.readlines()
        route = numpy.fromstring(' '.join(lines), dtype=int, sep=' ')
        # print(route[0:-1])
    return route[0:-1]

# Helper function: calculation cost of a route
def cal_cost(route, distances):
    cost = 0
    for i in range(len(route)-1):
        # print(distances[route[i]-1][route[i+1]-1])
        cost += distances[route[i]-1][route[i+1]-1]
    # print(cost)
    return cost

def simulated_annealing(distances):
    
    # Initialize
    # Start with a random tour through the selected cities. Note that it’s probably a very inefficient tour!
    num_of_nodes = len(distances)
    # print(num_of_nodes)
    def get_random_route():
        route = numpy.arange(1, num_of_nodes+1)
        numpy.random.shuffle(route)
        return route
    route = get_random_route()
    print('Initial route: \n', route)
    T = 1e15
    print('Initial T =', T)

    # Helper function: get next T temperature
    def get_new_T(T):
        k = 1
        return T * (0.97 ** k)
    # Help function: get accept probability
    def get_probability(old_cost, new_cost, T):
        k = 20.0
        # print('sdfgh', 1.0 / (1.0 + numpy.exp((new_cost - old_cost)/old_cost) / T))
        return 1.0 / (1.0 + numpy.exp((new_cost - old_cost)/k) / T)

    iter = 0
    while T > 1:
        iter += 1
        print(f'===== Iteration {iter} =====')
        # Pick a new candidate tour at random from all neighbors of the existing tour.
        # Choose two cities on the tour randomly, and then reverse the portion of the tour that lies between them
        # This candidate tour might be better or worse compared to the existing tour, i.e. shorter or longer.
        new_route = numpy.copy(route)
        swap_indices = numpy.random.randint(0, num_of_nodes, size=2)
        new_route[swap_indices[0]], new_route[swap_indices[1]] = new_route[swap_indices[1]], new_route[swap_indices[0]]

        print('Temperature =', T)
        # If the candidate tour is better than the existing tour, accept it as the new tour.
        cost = cal_cost(route, distances)
        new_cost = cal_cost(new_route, distances)
        if(new_cost <= cost):
            route = new_route
            cost = new_cost
        # If the candidate tour is worse than the existing tour, still maybe accept it, according to some probability. The probability of accepting an inferior tour is a function of how much longer the candidate is compared to the current tour, and the temperature of the annealing process. A higher temperature makes you more likely to accept an inferior tour
        else:
            P = get_probability(cost, new_cost, T)
            if(numpy.random.random() < P):
                route = new_route
                cost = new_cost
        T = get_new_T(T)
        print('Route = \n', route)
        print('cost =', cost)



if __name__ == '__main__':
    distances = read_distance()
    route = read_solution()
    simulated_annealing(distances)

    print('################# Solution #############')
    print(cal_cost(route, distances))